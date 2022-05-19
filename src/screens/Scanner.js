import {
  ActivityIndicator,
  Alert,
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";

import { useMutation } from "@apollo/client";
import { GETBOOKING_ID } from "../graphql/Mutation";

import Loading from "./Loading";

const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  // const [qrCodeData, setQrCodeData] = useState();
  const [getBookingById, { data, loading, error }] = useMutation(GETBOOKING_ID);

  const askFroCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askFroCameraPermission();
  }, []);

  // QR code handler
  const handleBarCodeScanned = (BarCodeScannerResult) => {
    if (!scanned) {
      setScanned(true);
      const { type, data = {} } = BarCodeScannerResult;
      getBookingById({ variables: { bookingId: data } });

      if (loading) return "Submitting...";
      if (error) return `Submission error! ${error.message}`;

      

      // Alert window
      Alert.alert(
        //This is title
        "Scanned",
        //This is body text
        `Bar code with type ${type} and data ${data} has been scanned!`,
        [
          {
            text: "Yes",
            onPress: () => console.log("Yes Pressed"),
          },
          {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
        //on clicking out side, Alert will not dismiss
      );

      // if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
      //     setScanned(true);
      //     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      // }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permission</Text>;
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text style={{ margin: 10 }}>No Access to Camera</Text>
        <Button title={"Allow Camera"} onPress={() => askFroCameraPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
        type={type}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      >
        {/* <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
            onPress={() => {
              setType(
                type === BarCodeScanner.Constants.Type.back
                  ? BarCodeScanner.Constants.Type.front
                  : BarCodeScanner.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, margin: 5, color: "white" }}>
              Flip
            </Text>
          </TouchableOpacity>
        </View> */}
        {/*https://github.com/shahnawaz/react-native-barcode-mask */}
        <BarcodeMask
          edgeColor="#62B1F6"
          showAnimatedLine
          outerMaskOpacity={0.7}
        />
      </BarCodeScanner>
      <View
        style={{
          backgroundColor: "transparent",
        }}
      >
        {scanned && (
          <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
        )}
      </View>

      {/* <View>
        {scanned && (
          <>
            <Button
              title="Tap to Scan Again"
              onPress={() => setScanned(false)}
            />
            <Text>This code: {text}</Text>
          </>
        )}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
