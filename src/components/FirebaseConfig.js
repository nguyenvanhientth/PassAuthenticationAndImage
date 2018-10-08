import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCyIQXefnGQIa5iY6FK4OX-6O-wHupT-7g",
  authDomain: "authenticationfire-80812.firebaseapp.com",
  databaseURL: "https://authenticationfire-80812.firebaseio.com",
  projectId: "authenticationfire-80812",
  storageBucket: "authenticationfire-80812.appspot.com",
  messagingSenderId: "434896235157"
};
export const firebaseApp = firebase.initializeApp(config);