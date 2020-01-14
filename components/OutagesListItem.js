import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Dimensions, StatusBar, Text } from "react-native";
import Colors from "../constants/Colors";
import {
  Divider,
  List,
  Avatar,
  Button,
  Card,
  Title,
  Chip,
  Paragraph
} from "react-native-paper";

export default function OutagesListItem(props) {
  const plan = text =>
    text === "plan" ? (
      <Chip
        mode="outlined"
        icon="chart-timeline"
        onPress={() => console.log("Pressed")}
      >
        Плановое
      </Chip>
    ) : (
      <Chip icon="alert" onPress={() => console.log("Pressed")}>
        Аварийное
      </Chip>
    );

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title={props.location}
          subtitle={<Text style={styles.subtitle}>{props.date}</Text>}
          right={() => plan(props.type)}
          //left={props => <Avatar.Icon {...props} icon="folder" />}
        />
        <Card.Content>
          <View style={styles.body}>
            <Text style={styles.title}>Время отключения</Text>
            <Text style={styles.subtitle}>{props.date_period}</Text>
            <Text style={styles.title}>Адреса</Text>
            <Text style={styles.subtitle}>{props.adress}</Text>
          </View>
        </Card.Content>

        <Card.Actions>
          <View style={styles.footer}>
            <Text style={styles.subtitle}>
              {props.UK != "" ? "УК: " + props.UK : ""}
            </Text>
            <Text style={styles.subtitle}>
              {props.district != "" ? "Район: " + props.district : ""}
            </Text>
            <Text style={styles.subtitle}>
              {props.section_number != ""
                ? "Секция: " + props.section_number
                : ""}
            </Text>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "whitesmoke"
  },
  title: {
    fontFamily: "roboto-regular",
    marginVertical: 8,
    fontWeight: "bold"
  },
  plan: {
    color: "green"
  },
  emergence: {
    color: "red"
  },
  body: {},
  subtitle: {
    fontFamily: "roboto-regular",
    opacity: 0.6
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.tintColor
  },
  divider: {
    height: 1,
    backgroundColor: "whitesmoke"
  },
  footer: {
    opacity: 0.7,
    marginTop: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
