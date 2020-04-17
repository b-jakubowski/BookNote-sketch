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

const authSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required().min(5),
});

const AuthScreen = () => {
	const [user, setUser] = useState({
		email: null,
		password: null,
	});

	const handleSubmit = ({email, password}) => {
		authSchema
			.validate(user, {abortEarly: false})
			.then(() => {
				console.log("correct schema", {email, password});
			})
			.catch((e) => {
				Toast.show({
					text: e.errors.join(",\r\n"),
					buttonText: "Okay",
					type: "warning",
					duration: 10000000,
				});
			});
	};

	return (
		<Content contentContainerStyle={styles.content}>
			<Card>
				<CardItem style={styles.card}>
					<Form style={styles.form}>
						<View>
							<Item style={styles.input}>
								<Input
									placeholder="Email"
									onChangeText={(value) => setUser({...user, email: value})}
									value={user.email}
								/>
							</Item>
							<Item style={styles.input}>
								<Input
									placeholder="Password"
									secureTextEntry={true}
									onChangeText={(value) => setUser({...user, password: value})}
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
							<Text>Sign up</Text>
						</Button>
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

export default AuthScreen;
