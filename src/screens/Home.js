import { View, Button, StyleSheet, Text } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please tap Scan button</Text>
      <Ionicons name="scan" size={22} color="black" />
      <Button title="Scan" onPress={() => navigation.navigate("Scanner")} />

      <View style={{ flexDirection: "row" }}>
        <Ionicons name="time-outline" size={26} color="black" />
        <Button
          title="Sessions"
          onPress={() => navigation.navigate("Sessions")}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: "black",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
  },
});
