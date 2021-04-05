import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const signIn = (email, password) =>
	auth().signInWithEmailAndPassword(email, password);

export const signOut = () =>
	auth().signOut();

export const createUser = (email, password) =>
	auth().createUserWithEmailAndPassword(email, password);

export const createUserProfileDocument = async (user, additionalData) => {
	if (!user) return;

	const userRef = firestore().doc(`/users/${user.uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = user;
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
		const userDocument = await firestore().collection("users").doc(uid).get();

		return { uid, ...userDocument.data() };
	} catch (error) {
		console.error("Error fetching user", error.message);
	}
};
