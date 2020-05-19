import React from "react";
import {
	Container,
	Text,
	Content,
	Button,
	View,
	ActionSheet,
} from "native-base";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";

import { Store } from "../store/store";
import { logOutUser } from "../store/actions/auth";
import { clearBooks } from "../store/actions/book";
import { User } from "../interfaces/user.interface";
import { signOut } from "../constants/Firebase";
import { showWarnToast } from "../helpers/Toast";

interface Props {
	user: User;
	logOutUser: () => void;
	clearBooks: () => void;
}

const UserDetailsScreen: React.FC<Props> = ({
	user,
	logOutUser,
	clearBooks,
}) => {
	const logOut = () => {
		signOut()
			.then(() => {
				clearBooks();
				logOutUser();
			})
			.catch((e) => showWarnToast(e));
	};

	const confirmLogout = () => {
		ActionSheet.show(
			{
				options: ["Yes", "No"],
				cancelButtonIndex: 1,
				destructiveButtonIndex: 0,
				title: "Do You want to log out ?",
			},
			(buttonIndex) => {
				if (buttonIndex === 0) {
					logOut();
				}
			}
		);
	};

	return (
		<Container>
			<Content contentContainerStyle={styles.content}>
				<Text>id: {user.uid}</Text>
				<Text>email: {user.email}</Text>
				<View style={styles.buttonsContainer}>
					<Button
						warning
						block
						style={styles.logOutButton}
						onPress={() => confirmLogout()}
					>
						<Text>Log out</Text>
					</Button>
				</View>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 40,
	},
	content: {
		flex: 1,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	logOutButton: {
		marginTop: 50,
	},
});

const mapStateToProps = (state: Store) => ({
	user: state.auth,
});

export default connect(mapStateToProps, { logOutUser, clearBooks })(
	UserDetailsScreen
);
