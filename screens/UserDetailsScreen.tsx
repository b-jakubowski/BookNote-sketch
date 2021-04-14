import React from "react";
import { Text, Button, View, ActionSheet } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Store } from "../store/store";
import { logOutUser } from "../store/actions/auth";
import { clearBooks } from "../store/actions/book";
import { signOut } from "../constants/Firebase";
import { showWarnToast } from "../helpers/Toast";
import { titleTextColor, spacing } from "../constants/Theme";

const ScreenContainer = styled(View)`
	flex: 1;
	padding: ${spacing.m};
	align-items: center;
	justify-content: center;
`;
const TextTheme = styled(Text)`
	color: ${titleTextColor};
`;
const ButtonsContainer = styled(View)`
	flex-direction: row;
	justify-content: space-around;
	margin-top: 80px;
`;

const UserDetailsScreen: React.FC = () => {
	const user = useSelector((state: Store) => state.auth);
	const dispatch = useDispatch();

	const logOut = async () => {
		try {
			await signOut();
			dispatch(clearBooks());
			dispatch(logOutUser());
		} catch (e) {
			showWarnToast(e);
		}
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
		<ScreenContainer>
			<TextTheme>id: {user.uid}</TextTheme>
			<TextTheme>email: {user.email}</TextTheme>
			<ButtonsContainer>
				<Button warning block onPress={() => confirmLogout()}>
					<Text>Log out</Text>
				</Button>
			</ButtonsContainer>
		</ScreenContainer>
	);
};

export default UserDetailsScreen;
