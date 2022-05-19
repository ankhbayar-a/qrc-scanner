import React from "react";
import "react-native-gesture-handler";
//import { AppRegistry } from "react-native";]
import { ApolloProvider, useQuery } from "@apollo/client";

import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigation/AppStack";

import { client } from "./src/graphql/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ApolloProvider>
  );
}

//AppRegistry.registerComponent("App", () => App);
