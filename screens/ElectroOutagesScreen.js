import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { getCustomTabsSupportingBrowsersAsync } from "expo-web-browser";
import Fuse from "fuse.js";
import { Input, ListItem } from "react-native-elements";
import OutagesListItem from "../components/OutagesListItem";
import { Searchbar, ActivityIndicator, Colors } from "react-native-paper";

export default class ElectroOutagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchData: {},
      searchResult: [],
      outages: [],
      limit: 10,
      refreshing: false
    };
  }

  updateSearch = search => {
    this.setState({ searchQuery: search });
    this.fuse();
  };

  getOutages = async () => {
    fetch("https://wsolver.ru/outages/outages.php").then(async response => {
      const text = await response.text();
      let json_text;
      if ((json_text = JSON.parse(text))) {
        this.setState({
          outages: json_text,
          searchResult: json_text,
          refreshing: false
        });
      }
    });
  };

  transformLocation = location => {
    switch (location) {
      case "tyumen":
        return "Тюмень";
      case "yuzhnyy-filial":
        return "Южный";
      case "tobolsk":
        return "Тобольск";
      case "ishim-filial":
        return "Ишим";
      default:
        break;
    }
  };

  fuse(e, y) {
    // 2 means it is nested
    var options = {
      shouldSort: true,
      threshold: 0.8,
      location: 0,
      refreshing: true,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["adress", "location"]
    };
    var fuse = new Fuse(this.state.outages, options);
    var res = fuse.search(this.state.searchQuery);

    console.log(res);
    this.setState({
      searchResult: this.state.searchQuery.length > 0 ? res : this.state.outages
    });
  }

  _keyExtractor = item => {
    return item.adress;
  };

  componentDidMount() {
    this.getOutages();
  }
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.getOutages}
          />
        }
        style={styles.container}
      >
        <View style={styles.header}>
          <Searchbar
            placeholder="Введите адрес..."
            onChangeText={this.updateSearch}
            value={this.state.searchQuery}
          />
        </View>
        <View>
          {this.state.searchResult.map((elem, index) => (
            <OutagesListItem
              {...elem}
              location={this.transformLocation(elem.location)}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

ElectroOutagesScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "whitesmoke"
  },
  tagsViews: {
    flexDirection: "column",
    marginTop: 10
  },
  header: {
    elevation: 20,
    zIndex: 10
  },
  tag: {
    color: "gray",
    padding: 5,
    margin: 5,
    borderColor: "blue",
    borderRadius: 8,
    borderWidth: 1
  }
});
