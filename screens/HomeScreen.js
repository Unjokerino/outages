import * as React from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { LearnMoreLinks } from "react-native/Libraries/NewAppScreen";
import ElectroOutagesScreen from "./ElectroOutagesScreen";

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

  const renderScene = SceneMap({
    first: ElectroOutagesScreen,
    second: SecondRoute
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
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
  scene: {
    flex: 1
  }
});
