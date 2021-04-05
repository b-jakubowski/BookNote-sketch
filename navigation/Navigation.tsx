import React, { useEffect, useState } from "react";
import {
	createStackNavigator,
	StackNavigationOptions,
} from "@react-navigation/stack";
import { connect } from "react-redux";
import {
	NavigationContainer,
	DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import styled, { ThemeProvider } from "styled-components";
import auth from "@react-native-firebase/auth";

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
import { logInUser } from "../store/actions/auth";

interface Props {
	loading: boolean;
	logInUser: (user: any) => void;
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

const stackScreenOptions: StackNavigationOptions = {
	headerBackTitleVisible: false,
	headerTitleAlign: "center",
};

const Navigation: React.FC<Props> = ({ loading, logInUser }) => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();
	const theme = useTheme();

	const onAuthStateChanged = (user: any) => {
		setUser(user);
		if (user) logInUser(user);
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

		return subscriber;
	}, []);

	if (initializing) return null;

	if (!user) {
		return <AuthScreen />;
	}

	return (
		<ThemeProvider theme={{ mode: theme.mode }}>
			<ContainerTheme>
				<NavigationContainer
					theme={theme.mode === "dark" ? DarkTheme : DefaultTheme}
				>
					{!loading && (
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

export default connect(mapStateToProps, { logInUser })(Navigation);
