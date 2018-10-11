import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {firebaseApp} from './FirebaseConfig';

export default class RealtimeDB extends Component{
    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database().ref('DBThongTin');
        this.state = {

        }
    }
    setDB(){
        this.itemRef.set({
            userDang: 'trang thai',
            DiaChi: '12A-b-c',
            TrangThai: ''
        })
    }
    render(){
        return(
            <View style = {styles.container}>
                <TouchableOpacity style = {styles.Touchable} onPress = {() => {this.setDB()}}>
                    <Text>
                        set DB!
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    textinput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor:'#DDDDDD',
        borderRadius: 10,
    },
    Touchable: {
        backgroundColor: 'green',
        padding: 10,
        marginLeft: 10,
    },
    text: {
        color: '#fff',

    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    }
    
})