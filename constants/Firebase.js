import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyDc3UarX9WOQFCz2P1HUnRcEz371llTSyc",
	authDomain: "booknote-1ec65.firebaseapp.com",
	databaseURL: "https://booknote-1ec65.firebaseio.com",
	projectId: "booknote-1ec65",
	storageBucket: "booknote-1ec65.appspot.com",
	messagingSenderId: "528556434593",
	appId: "1:528556434593:web:ce25914067f983a7b13ce0",
	measurementId: "G-6KS3ZT8XKG",
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export const signIn = (email, password) =>
	firebase.auth().signInWithEmailAndPassword(email, password);

export const createUser = (email, password) =>
	firebase.auth().createUserWithEmailAndPassword(email, password);

export const signOut = firebase.auth().signOut();

export default firebase;
