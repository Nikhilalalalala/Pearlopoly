import React from 'react';
import { StyleSheet, Image, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';

function RegisterScreen ( {navigation} ) {

  return(
    <KeyboardAvoidingView style={screen.container}>
      <Image style={register.title} source={require('../../assets/titlewithouticon.png')} />

      <TextInput
        style = {register.textField}
        placeholder = 'USERNAME'
        placeholderTextColor = '#BB7E5D'
        returnKeyType = 'next'        
      />

      <TextInput
        style = {register.textField}
        placeholder = 'PASSWORD'
        placeholderTextColor = '#BB7E5D'
        returnKeyType = 'done'
        secureTextEntry = {true}
      />

      <TextInput
        style = {register.textField}
        placeholder = 'RE-ENTER PASSWORD'
        placeholderTextColor = '#BB7E5D'
        returnKeyType = 'done'
        secureTextEntry = {true}
      /> 

      <TouchableOpacity style={register.button} onPress={() => navigation.navigate('Overview')}>
        <Text style={{color: '#FFFFFF'}}>
          REGISTER
        </Text>
      </TouchableOpacity>

      <Text style={register.login} onPress={() => navigation.navigate('Login')}>
        ALREADY HAVE AN ACCOUNT?
      </Text>
    </KeyboardAvoidingView>
  );
}

const screen = StyleSheet.create({
	container: {
    marginTop: StatusBar.currentHeight,
  	flex: 1,
  	backgroundColor: '#FAF3DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const register = StyleSheet.create({
  title : {
    marginBottom: 40,
  },
  textField: {
    height: 45,
    width: '80%',
    borderColor: '#BB7E5D',
    borderWidth: 3,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button : {
    height: 30,
    width: 150,
    marginTop: 30,
    backgroundColor: "#75B9BE",
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    marginTop: 100,
    textDecorationLine: 'underline',
  }
});

export default RegisterScreen;