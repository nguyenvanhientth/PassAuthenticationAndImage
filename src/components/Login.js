import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, View,TouchableOpacity,Text, ImageBackground, Alert} from 'react-native';
import navigation from 'react-navigation';
import {firebaseApp} from './FirebaseConfig'

const image = require('../backgroundImage/hinhnen.jpg')

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: '',
        }
    }
    _onChaneText = (email) =>{
        this.setState({email})
    }
    _onChanePassWord = (pass) =>{
        this.setState({pass})
    }
    dangNhap(){
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
        .then(() => {
            Alert.alert(
                'Alert Title',
                'Đăng nhập thành công! ',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => this.props.navigation.navigate('Home', {
                            name: this.state.email,
                  })},
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
                'Đăng nhập thất bại! ',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('Ok')},
                ],
                { cancelable: false }
              )
          });debugger;
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <ImageBackground 
                source = {image}
                style= {styles.backgroundImage}>
            <View style ={{flex: 1,justifyContent: 'center',}}>
            <Text style={{color: 'blue',fontSize: 60,fontWeight: 'bold'}}>Login</Text>
                <TextInput 
                    style = {styles.textinput}
                    placeholder="Tài khoản"
                    onChangeText = {this._onChaneText.bind(this)}    
                    value = {this.state.email} 
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
                        onPress = {() => {this.dangNhap()}}
                        >
                        <Text style = {styles.text}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.Touchable}
                        onPress = {()=>{navigate('DangKy')}}>
                        <Text style = {styles.text}>
                            Register
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