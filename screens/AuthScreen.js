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
} from "native-base";
import {StyleSheet} from "react-native";
import * as yup from "yup";
import {connect} from "react-redux";
import {logInUser} from "../store/actions/auth";
import {signIn, createUser} from "../constants/Firebase";

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

const AuthScreen = ({logInUser}) => {
	const [auth, setAuth] = useState(null);
	const [user, setUser] = useState({
		email: null,
		password: null,
	});
	console.log(auth);

	const handleSubmit = ({email, password}) => {
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
			});
	};

	const createAndSignUser = (email, password) => {
		createUser(email, password)
			.then(({user}) => logInUser(user))
			.catch(({message}) => {
				showWarnToast(message);
			});
	};

	return (
		<Content contentContainerStyle={styles.content}>
			<Card>
				<CardItem style={styles.card}>
					<Form style={styles.form}>
						{auth ? (
							<>
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
									<Text>{auth === "login" ? "Login" : "Sign in"}</Text>
								</Button>
							</>
						) : (
							<>
								<Button onPress={() => setAuth("login")}>
									<Text>Login</Text>
								</Button>
								<Button onPress={() => setAuth("signUp")}>
									<Text>Sign up</Text>
								</Button>
							</>
						)}
					</Form>
				</CardItem>
			</Card>
		</Content>
	);
};

const styles = StyleSheet.create({
	button: {
		marginTop: 30,
		width: 120,
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
	input: {
		marginBottom: 10,
	},
});

export default connect(null, {logInUser})(AuthScreen);
