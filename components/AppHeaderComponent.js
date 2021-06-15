import React from "react";
import { StyleSheet, Text, View } from "react-native";
const Header = () => {
  return (
    <View style={Styles.header}>
      <Text>Clane Code Challenge</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  header: {
    height: 100,
    paddingTop: 38,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "coral",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
