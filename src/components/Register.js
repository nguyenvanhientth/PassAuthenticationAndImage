import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert, ImageBackground} from 'react-native';
import {firebaseApp} from './FirebaseConfig';

const image = require('../backgroundImage/hinhnen.jpg')

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            taikhoan: '',
            pass: '',
        }
    }
    _onChaneText = (taikhoan) =>{
        this.setState({taikhoan})
    }
    _onChanePassWord = (pass) =>{
        this.setState({pass});
    }
    DangKy() {
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.taikhoan, this.state.pass)
        .then(() => {
            Alert.alert(
                'Alert Title',
                'Đăng ký thành công! ' + this.state.taikhoan,
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => this.props.navigation.navigate('DangNhap')},
                ],
                { cancelable: false }
              )
              this.setState({
                  taikhoan: '',
                  pass: ''
              })
        })
        .catch((error) => {
            Alert.alert(
                'Alert Title',
                'Đăng ký thất bại! ',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('Ok')},
                ],
                { cancelable: false }
              )
          });
    }
    render(){
        return(
            <ImageBackground style={styles.backgroundImage}
                source = {image} >
                <View style ={{flex: 1,justifyContent: 'center'}}>
                    <Text style ={{color: 'blue',fontSize: 60, fontWeight: 'bold'}}>Register</Text>
                    <TextInput 
                        style = {styles.textinput}
                        placeholder="Email"
                        onChangeText = {this._onChaneText.bind(this)}    
                        value = {this.state.taikhoan} 
                    />
                    <TextInput 
                        style = {styles.textinput}
                        placeholder="Mật khẩu"
                        onChangeText = {this._onChanePassWord.bind(this)}    
                        value = {this.state.pass} 
                        secureTextEntry = {true}
                    />
                    <View style = {{flexDirection: 'row', marginTop: 10,justifyContent: 'center'}}>
                        <TouchableOpacity style = {styles.Touchable}
                            onPress = {()=>{this.DangKy()}}>
                            <Text style = {styles.text}>
                                Register account!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
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