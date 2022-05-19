import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { GETSESSIONTODAY } from "../graphql/Queries";
import { FlatList } from "react-native-gesture-handler";
import Loading from "./Loading";

// client
//   .query({
//     query: GETSESSIONTODAY,
//   })
//   .then(function (result) {
//     console.log(" RESULT ===> ", result);
//     return result;
//   })
//   .catch(function (e) {
//     console.log(" ERROR ==>", e);
//   });

function SessionToday() {
  const { data, error, loading } = useQuery(GETSESSIONTODAY, {
    errorPolicy: "all",
    pollInterval: 500,
  });

  // useEffect(() => {
  //   console.log(data);
  // }, []);

  if (loading) return <Loading />;

  if (error) return <Text>Error</Text>;

  // const list = data.getSessionsToday.map(
  //   ({ Showtime, ID, ScheduledFilmId }) => (
  //     <View>
  //       <Text>{Showtime}</Text>
  //       <Text>{ID}</Text>
  //       <Text>{ScheduledFilmId}</Text>
  //     </View>
  //   )
  // );

  // String Date to Hours and Minutes
  function todaysession(time) {
    const times = new Date(time);
    const hours = times.getHours();
    const minutes = times.getMinutes();
    return (
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes)
    );
  }

  // Line separator of list
  function renderSeparator() {
    return (
      <View
        style={{
          height: 2,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
        }}
      />
    );
  }

  const list = (
    <FlatList
      data={data.getSessionsToday}
      ItemSeparatorComponent={renderSeparator}
      renderItem={({ item }) => (
        <>
          <Text
            style={{
              fontSize: 36,
              padding: 5,
              alignItems: "flex-start",
              backgroundColor: "#eee",
            }}
          >
            {item.ScreenNumber}
          </Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ddd",
              marginVertical: 10,
            }}
          >
            <Text>{todaysession(item.Showtime)}</Text>
            <Text style={{ alignItems: "flex-end", marginLeft: 5 }}>
              {item.ScreenName}
            </Text>
            <Text style={{ alignItems: "flex-end", marginLeft: 5 }}>
              Available seats: {item.SeatsAvailable}
            </Text>
          </View>
        </>
      )}
    />
  );

  return list;

  // data.getSessionsToday.map(({ ScheduledFilmId, Showtime }) => (
  //   <Text key={ScheduledFilmId}>
  //     <Text>
  //       {ScheduledFilmId}: {Showtime}
  //     </Text>
  //   </Text>
  // ));
}

export default function Sessions({ navigation }) {
  return (
    <ScrollView nestedScrollEnabled={true} style={{ flex: 1, width: "100%" }}>
      <View style={styles.container}>
        <Text style={{ padding: 5, margin: 5 }}>Өнөөдрийн цагийн хуваарь</Text>
        <View
          style={{
            height: 2,
            width: "84%",
            backgroundColor: "#CED0CE",
          }}
        />
        <SessionToday />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
