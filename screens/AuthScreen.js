import React, {useState} from "react";
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
	Toast,
	Icon,
} from "native-base";
import {
	StyleSheet,
	SafeAreaView,
	ActivityIndicator,
	ImageBackground,
} from "react-native";
import * as yup from "yup";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logInUser} from "../store/actions/auth";
import {setLoading, setLoadingComplete} from "../store/actions/loading";
import {
	signIn,
	createUser,
	createUserProfileDocument,
} from "../constants/Firebase";

const showWarnToast = (message) => {
	Toast.show({
		text: message,
		buttonText: "Okay",
		type: "warning",
		duration: 10000000,
	});
};

const authSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required().min(5),
});

function AuthScreen({logInUser, loading, setLoading, setLoadingComplete}) {
	const [auth, setAuth] = useState("login");
	const [user, setUser] = useState({
		email: null,
		password: null,
	});

	const handleSubmit = ({email, password}) => {
		setLoading();

		authSchema
			.validate(user, {abortEarly: false})
			.then(() => {
				auth === "login"
					? signInUser(email, password)
					: createAndSignUser(email, password);
			})
			.catch((e) => showWarnToast(e.errors.join(",\r\n")));
	};

	const signInUser = (email, password) => {
		signIn(email, password)
			.then(({user}) => logInUser(user))
			.catch(({message}) => {
				showWarnToast(message);
			})
			.finally(() => setLoadingComplete());
	};

	const createAndSignUser = (email, password) => {
		createUser(email, password)
			.then(({user}) => {
				createUserProfileDocument(user);
				logInUser(user);
			})
			.catch(({message}) => {
				showWarnToast(message);
			})
			.finally(() => setLoadingComplete());
	};

	return (
		<ImageBackground
			source={require("../assets/images/books-background.jpg")}
			style={styles.image}
		>
			{auth === "signUp" && (
				<SafeAreaView>
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
			<Content contentContainerStyle={styles.content}>
				{loading ? (
					<ActivityIndicator size="large" />
				) : (
					<Card>
						<CardItem style={styles.card}>
							<Form style={styles.form}>
								<View>
									<Item style={styles.input}>
										<Input
											placeholder="Email"
											autoCapitalize="none"
											onChangeText={(value) => setUser({...user, email: value})}
											value={user.email}
										/>
									</Item>
									<Item style={styles.input}>
										<Input
											placeholder="Password"
											secureTextEntry={true}
											onChangeText={(value) =>
												setUser({...user, password: value})
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
}

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

AuthScreen.propTypes = {
	logInUser: PropTypes.func,
	loading: PropTypes.bool,
	setLoading: PropTypes.func,
	setLoadingComplete: PropTypes.func,
};

const mapStateToProps = (state) => ({
	loading: state.globalLoading.loading,
});

export default connect(mapStateToProps, {
	logInUser,
	setLoading,
	setLoadingComplete,
})(AuthScreen);
