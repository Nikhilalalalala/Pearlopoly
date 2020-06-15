import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SingleRecord = (props) => {
  return (
    <View style={stylesSingleRecord.container}>
      <Text style={stylesSingleRecord.name}>{props.children}</Text>
      <Text style={stylesSingleRecord.category}>{props.category}</Text>
      <Text style={stylesSingleRecord.value}>{props.value}</Text>
    </View>
  );
};

export default SingleRecord;

const stylesSingleRecord = StyleSheet.create({
  container: {
    backgroundColor: "#E1E2DA",
    justifyContent: "center",
    width: '90%',
    height: 45,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  name: {
    // paddingHorizontal: 10,
    // marginTop: 25,
    // fontFamily: "Lato-Bold",
  },
  category: {
    // paddingHorizontal: 10,
    // marginTop: 5,
    // fontFamily: "Lato-Bold",
  },
  value: {
    color: "#ED6A5A",
    // marginLeft: 270,
    // top: -35,
    // fontWeight: "900",
    // fontSize: 20,
    fontFamily: "Lato-Bold",
  },
});
