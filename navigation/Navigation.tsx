import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import {
	NavigationContainer,
	DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import styled, { ThemeProvider } from "styled-components";

import AuthScreen from "../screens/AuthScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import AddQuoteScreen from "../screens/AddQuoteScreen";
import CameraScreen from "../screens/CameraScreen";
import EditBookDetailsScreen from "../screens/EditBookDetailsScreen";
import { User } from "../interfaces/user.interface";
import UserDetailsScreen from "../screens/UserDetailsScreen";
import AddBookScreen from "../screens/AddBookScreen";
import { useTheme } from "../context/ThemeContext";
import { StackParamList } from "./types";
import { Container } from "native-base";
import { backgroundColor } from "../constants/Theme";

interface Props {
	user: User;
	loading: boolean;
}

interface StateProps {
	auth: User;
	globalLoading: {
		loading: boolean;
	};
}

const Stack = createStackNavigator<StackParamList>();

const ContainerTheme = styled(Container)`
	background: ${backgroundColor};
`;

const stackScreenOptions = {
	headerBackTitleVisible: false,
	headerTitleAlign: "center",
};

const Navigation: React.FC<Props> = ({ user, loading }) => {
	const theme = useTheme();

	return (
		<ThemeProvider theme={{ mode: theme.mode }}>
			<ContainerTheme>
				<NavigationContainer
					theme={theme.mode === "dark" ? DarkTheme : DefaultTheme}
				>
					{user.uid && !loading ? (
						<Stack.Navigator>
							<Stack.Screen
								name="Books"
								component={BottomTabNavigator}
								options={stackScreenOptions}
							/>
							<Stack.Screen
								name="Book details"
								component={BookDetailsScreen}
								options={stackScreenOptions}
							/>
							<Stack.Screen
								name="Add/Edit Quote"
								component={AddQuoteScreen}
								options={stackScreenOptions}
							/>
							<Stack.Screen
								name="Camera"
								component={CameraScreen}
								options={stackScreenOptions}
							/>
							<Stack.Screen
								name="Edit book details"
								component={EditBookDetailsScreen}
								options={stackScreenOptions}
							/>
							<Stack.Screen
								name="User details"
								component={UserDetailsScreen}
								options={stackScreenOptions}
							/>
							<Stack.Screen
								name="Add book"
								component={AddBookScreen}
								options={stackScreenOptions}
							/>
						</Stack.Navigator>
					) : (
						<AuthScreen />
					)}
				</NavigationContainer>
			</ContainerTheme>
		</ThemeProvider>
	);
};

const mapStateToProps = (state: StateProps) => ({
	user: state.auth,
	loading: state.globalLoading.loading,
});

export default connect(mapStateToProps)(Navigation);
