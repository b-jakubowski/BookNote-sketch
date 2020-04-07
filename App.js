import * as React from "react";
import {Platform, StatusBar, StyleSheet, View} from "react-native";
import {SplashScreen} from "expo";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import PropTypes from "prop-types";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import BookDetails from "./screens/BookDetails";

const Stack = createStackNavigator();

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);
	const [initialNavigationState, setInitialNavigationState] = React.useState();
	const containerRef = React.useRef();
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
		<View style={styles.container}>
			{Platform.OS === "ios" && <StatusBar barStyle="default" />}
			<NavigationContainer
				ref={containerRef}
				initialState={initialNavigationState}
				initialRouteName="Root"
			>
				<Stack.Navigator>
					<Stack.Screen name="Root" component={BottomTabNavigator} />
					<Stack.Screen name="BookDetails" component={BookDetails} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
});

App.propTypes = {
	skipLoadingScreen: PropTypes.bool,
};
