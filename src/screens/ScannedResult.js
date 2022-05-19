import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ScannedResult({ navigation, route }) {
  console.log(route.data)
  return (
    <View style={styles.container}>
      <Text>
        // !!! data irehgui bn
        Sessions: {route.data}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
