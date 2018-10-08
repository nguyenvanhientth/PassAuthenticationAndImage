/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  storePicture() { 
    console.log(PicturePath); if (PicturePath) { 
    // Create the form data object 
    var data = new FormData(); 
    data.append('picture', { uri: PicturePath, name: 'selfie.jpg', type: 'image/jpg' }); 
    // Create the config object for the POST 
    // You typically have an OAuth2 token that you use for authentication 
    const config = { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data;', Authorization: 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH' }, body: data }; 
    fetch('https://postman-echo.com/post', config) .
    then(responseData => { 
      // Log the response form the server 
      // Here we get what we sent to Postman back 
      console.log(responseData); }) 
      .catch(err => { console.log(err); }); 
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
