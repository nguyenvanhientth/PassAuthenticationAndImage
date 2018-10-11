import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {firebaseApp} from './FirebaseConfig';
import CameraRollPicker from 'react-native-camera-roll-picker'

const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

var options = {
    title: 'Select images from',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook '},
    ],
    storegeOptions: {
        skipBackup: true,
        path: 'images',
        multiple: true
    }
};

const uploadImage = (uri, mime = 'image/jpeg')=>{
    return new Promise((resolve,reject) => {
        const uploadUri = (Platform.OS === 'ios'? uri.replace('file://','') : uri);
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = storage.ref('Images').child(`${sessionId}.jpg`);

        fs.readFile(uploadUri, 'base64')
        .then((data) => {
            return Blob.build(data,{type: `${mime};BASE64`});
        })
        .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob,{contentType: mime})
        })
        .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL();
        })
        .then((url) => {
            resolve(url)
        })
        .catch((err) => {
            reject(err)
        })
    });
}

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            //avatarSource: null
            arrImage: []
        }
    }
    showImage(){
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({avatarSource:''})
            if (response.didCancel) {
                
            } 
            else if (response.error) {
                
            } 
            else if (response.customButton){
                
            }
            else {
                // // lấy đường dẫn để hiển thị image!!
                // let source = {uri : response.uri};
                // //let source = {uri: `data:image/jpeg; base64,` +  response.data};
                //  this.setState({
                //      avatar : source,
                //  });
                uploadImage(response.uri)
                .then( url => this.setState({avatarSource: url}))
                .catch(err => console.log(err)) ;
                debugger;   
            }
        });
    }
    render(){
        const getname = this.props.navigation.state.params.name;
        return(
            <View style = {styles.container}>
             {
                 (() => {
                     switch (this.state.avatarSource) {
                         case null:
                              return null
                         case '':
                            return <ActivityIndicator />
                     
                         default:
                             return (
                                 <View>
                                    <Image source = {{uri : this.state.avatarSource}} style = {{height: 150, width: 120}} />
                                    <Text>{this.state.avatarSource}</Text>
                                </View>
                             )
                     }
                 }) ()
             }
                <Text>Hello {getname} ! </Text>
                <TouchableOpacity onPress = {() => {this.showImage()}}
                    style = {{backgroundColor: 'gray'}}
                    >
                    <Text style = {styles.text}>
                        Select image upload! 
                    </Text>
                </TouchableOpacity>
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