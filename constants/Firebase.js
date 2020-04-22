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

export const createUserProfileDocument = async (user, additionalData) => {
	if (!user) return;

	const userRef = firestore.doc(`/users/${user.uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const {displayName, email} = user;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.error("Error while creating user", error);
		}
	}

	return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
	if (!uid) return null;

	try {
		const userDocument = await firestore.collection("users").doc(uid).get();

		return {uid, ...userDocument.data()};
	} catch (error) {
		console.error("Error fetching user", error.message);
	}
};

export const signOut = () => firebase.auth().signOut();

export default firebase;
