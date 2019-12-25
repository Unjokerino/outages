import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { getCustomTabsSupportingBrowsersAsync } from "expo-web-browser";
import Fuse from "fuse.js";
import { Input, ListItem } from "react-native-elements";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

export default class ElectroOutagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchData: {},
      outages: [],
      limit: 10,
      refreshing: false
    };
  }

  getOutages = () => {
    fetch("https://wsolver.ru/outages/outages.php").then(async response => {
      const text = await response.text();
      let json_text;
      if ((json_text = JSON.parse(text))) {
        this.setState({
          outages: json_text
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

  fuse(query, y) {
    const nested = [
      { name: "typechild.name", weight: 0.4 },
      { name: "typechild.vals", weight: 0.3 }
    ];

    const threshhold = 0.3;
    // 2 means it is nested
    var opts = {
      shouldSort: true,
      threshold: threshhold,
      keys: nested
    };
    var fuse = new Fuse(this.state.outages, opts);
    var res = fuse.search(this.state.searchVal);
    return res;
  }

  _keyExtractor = item => {
    return item.adress;
  };

  _renderItem = ({ item }) => (
    <View>
      <Text>111</Text>
      <Text>{item.adress}</Text>
    </View>
  );

  componentDidMount() {
    this.getOutages();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Input
          placeholder="Введите адрес"
          onChangeText={text => {
            this.setState({ searchQuery: text });
          }}
          c
        ></Input>
        <ScrollView
          style={styles.tagsViews}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {this.state.outages.map(elem => (
            <TouchableOpacity>
              <Text style={styles.tag}>
                {this.transformLocation(elem.location)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View>
          {this.state.outages.map(elem => (
            <View>
              {Object.keys(elem.plan).map(v => (
                <View>
                  <Text>{v}</Text>
                  {elem.plan[v].map(plan => (
                    <View>
                      <Text>{plan.UK}</Text>
                      <Text>{plan.adress}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
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
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  tagsViews: {
    flexDirection: "column",
    marginTop: 10
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
