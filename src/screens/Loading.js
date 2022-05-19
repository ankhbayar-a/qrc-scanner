import React from "react";
import { View, ActivityIndicator } from "react-native";

export const PINK = "#ff5dc8";

export default () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color={PINK} />
  </View>
);
