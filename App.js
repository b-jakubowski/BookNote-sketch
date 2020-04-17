import React, {useState, useRef} from "react";
import {Platform, StatusBar, StyleSheet, View} from "react-native";
import {SplashScreen} from "expo";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import PropTypes from "prop-types";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Provider} from "react-redux";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import BookDetailsScreen from "./screens/BookDetailsScreen";
import configureStore from "./store/store";
import EditQuoteScreen from "./screens/EditQuoteScreen";
import {Root, Container} from "native-base";
import AuthScreen from "./screens/AuthScreen";

const Stack = createStackNavigator();
const store = configureStore();

console.ignoredYellowBox = ["Setting a timer"];

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false);
	const [initialNavigationState, setInitialNavigationState] = useState();
	const [user, setUser] = useState(null);
	const containerRef = useRef();
	const {getInitialState} = useLinking(containerRef);

	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

				setInitialNavigationState(await getInitialState());

				await Font.loadAsync({
					Roboto: require("native-base/Fonts/Roboto.ttf"),
					Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
					...Ionicons.font,
					"space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
					gotu: require("./assets/fonts/Gotu-Regular.ttf"),
				});
			} catch (e) {
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hide();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return !isLoadingComplete && !props.skipLoadingScreen ? null : (
		<Provider store={store}>
			<Root>
				<Container>
					{Platform.OS === "ios" && <StatusBar barStyle="default" />}
					{user ? (
						<NavigationContainer
							ref={containerRef}
							initialState={initialNavigationState}
							initialRouteName="Books"
						>
							<Stack.Navigator>
								<Stack.Screen name="Books" component={BottomTabNavigator} />
								<Stack.Screen
									name="BookDetails"
									component={BookDetailsScreen}
								/>
								<Stack.Screen name="EditQuote" component={EditQuoteScreen} />
							</Stack.Navigator>
						</NavigationContainer>
					) : (
						<AuthScreen />
					)}
				</Container>
			</Root>
		</Provider>
	);
}

App.propTypes = {
	skipLoadingScreen: PropTypes.bool,
};
