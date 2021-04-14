import React, { useState } from "react";
import {
	Content,
	Card,
	CardItem,
	Button,
	Text,
	Form,
	Item,
	Input,
	View,
	Icon,
} from "native-base";
import {
	StyleSheet,
	SafeAreaView,
	ActivityIndicator,
	ImageBackground,
} from "react-native";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

import { logInUser } from "../store/actions/auth";
import { setLoading, setLoadingComplete } from "../store/actions/loading";
import {
	signIn,
	createUser,
	createUserProfileDocument,
} from "../constants/Firebase";
import { showWarnToast } from "../helpers/Toast";
import { User, UserCredentials } from "../interfaces/user.interface";
import { Store } from "../store/store";

const styles = StyleSheet.create({
	backButton: {
		marginLeft: 10,
		width: 100,
	},
	button: {
		marginTop: 30,
	},
	content: {
		flex: 1,
		justifyContent: "center",
	},
	form: {
		flex: 1,
		paddingHorizontal: 15,
		paddingVertical: 30,
	},
	image: {
		flex: 1,
		justifyContent: "center",
		resizeMode: "cover",
	},
	input: {
		marginBottom: 10,
	},
	safeArea: {
		paddingTop: Constants.platform?.android ? 25 : 0,
	},
	signUpButton: {
		width: 150,
	},
	signUpContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 50,
	},
});

const authSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required().min(5),
});

const AuthScreen: React.FC = () => {
	const [auth, setAuth] = useState("login");
	const [user, setUser] = useState<UserCredentials>({
		email: "",
		password: "",
	});
	const loading = useSelector((state: Store) => state.globalLoading.loading);
	const dispatch = useDispatch();

	const handleSubmit = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		dispatch(setLoading());

		try {
			await authSchema.validate(user, { abortEarly: false });
			auth === "login"
				? signInUser(email, password)
				: createAndSignUser(email, password);
		} catch (e) {
			showWarnToast(e);
		} finally {
			dispatch(setLoadingComplete());
		}
	};

	const signInUser = async (email: string, password: string) => {
		try {
			const { user } = await signIn(email, password);
			dispatch(logInUser(user as User));
		} catch ({ message }) {
			showWarnToast(message, true);
		} finally {
			dispatch(setLoadingComplete());
		}
	};

	const createAndSignUser = async (email: string, password: string) => {
		try {
			const { user } = await createUser(email, password);
			createUserProfileDocument(user);
			dispatch(logInUser(user as User));
		} catch ({ message }) {
			showWarnToast(message);
		} finally {
			dispatch(setLoadingComplete());
		}
	};

	return (
		<ImageBackground
			source={require("../assets/images/books-background.jpg")}
			style={styles.image}
		>
			{auth === "signUp" && (
				<SafeAreaView style={styles.safeArea}>
					<Button
						iconLeft
						light
						style={styles.backButton}
						onPress={() => setAuth("login")}
					>
						<Icon name="arrow-back" />
						<Text>Back</Text>
					</Button>
				</SafeAreaView>
			)}

			<Content contentContainerStyle={styles.content} padder>
				{loading ? (
					<ActivityIndicator size="large" />
				) : (
					<Card>
						<CardItem>
							<Form style={styles.form}>
								<View>
									<Item style={styles.input}>
										<Input
											placeholder="Email"
											autoCapitalize="none"
											onChangeText={(value) =>
												setUser({ ...user, email: value })
											}
											value={user.email}
										/>
									</Item>
									<Item style={styles.input}>
										<Input
											placeholder="Password"
											secureTextEntry={true}
											onChangeText={(value) =>
												setUser({ ...user, password: value })
											}
											value={user.password}
										/>
									</Item>
								</View>
								<Button
									info
									block
									style={styles.button}
									onPress={() => handleSubmit(user)}
								>
									<Text>{auth === "login" ? "Login" : "Sign up"}</Text>
								</Button>
								{auth === "login" && (
									<View style={styles.signUpContainer}>
										<Text>Dont have account?</Text>
										<Button light block style={styles.signUpButton}>
											<Text onPress={() => setAuth("signUp")}>
												Sign up now!
											</Text>
										</Button>
									</View>
								)}
							</Form>
						</CardItem>
					</Card>
				)}
			</Content>
		</ImageBackground>
	);
};

export default AuthScreen;
