import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import Login from './Login';
import Register from './Register';
import Home from './Home'

const ViewScreen = createStackNavigator(
    {
        DangNhap : Login,
        DangKy: {
            screen: Register,
        },
        Home: Home,
    },
    {
        initialRouteName : 'DangNhap'
    }
)

export default class App extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <ViewScreen />
        );
    }
}