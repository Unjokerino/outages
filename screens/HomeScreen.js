import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Animated from "react-native-reanimated";
import { LearnMoreLinks } from "react-native/Libraries/NewAppScreen";
import ElectroOutagesScreen from "./ElectroOutagesScreen";
import { Surface } from "react-native-paper";

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
);

const initialLayout = { width: Dimensions.get("window").width };

export default function HomeScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Электричество" },
    { key: "second", title: "Водоснабжение" }
  ]);
  const _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <Surface style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              <Text>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </Surface>
    );
  };

  const renderScene = SceneMap({
    first: ElectroOutagesScreen,
    second: SecondRoute
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight
  },
  tabBar: {
    elevation: 4,
    flexDirection: "row"
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16
  },
  scene: {
    flex: 1
  }
});
