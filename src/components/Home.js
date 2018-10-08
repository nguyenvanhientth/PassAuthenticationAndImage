import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook '},
    ],
    storegeOptions: {
        skipBackup: true,
        path: 'images'
    }
};


export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            avatarSource: null,
        }
    }
    showImage(){
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                
            } 
            else if (response.error) {
                
            } 
            else if (response.customButton){
                
            }
            else {
                let source = {uri : response.uri};
                //let source = {uri: `data:image/jpeg; base64,` +  response.data};
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    render(){
        const getname = this.props.navigation.state.params.name;
        return(
            <View style = {styles.container}>
                <Text>Hello {getname} ! </Text>
                <TouchableOpacity onPress = {() => {this.showImage()}}
                    style = {{backgroundColor: 'gray'}}
                    >
                    <Text style = {styles.text}>
                        Select image upload! 
                    </Text>
                </TouchableOpacity>
                <Image source = {this.state.avatarSource} style = {{height: 150, width: 120}} />
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
    text: {
        color: 'blue',
        fontSize: 25,
    }
});