import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SingleRecord = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {props.children}
            </Text>
            <Text style={styles.category}>
                {props.category}
            </Text>
            <Text style={styles.value}>
                {props.value}
            </Text>

        </View>
    )
}

export default SingleRecord;

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#E1E2DA',
    justifyContent: 'center',
    width: 325,
    height: 45,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop:10,
    

  },
  name: {
    paddingHorizontal: 10,
    marginTop: 25,

  },
  category: {
    paddingHorizontal: 10,
    marginTop: 5,

  },
  value :{
    color: '#ED6A5A',
    marginLeft: 270,
    top: -35,
    fontWeight: "900",
    fontSize:20,


  } 
});
