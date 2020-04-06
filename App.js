import * as React from "react";
import {Platform, StatusBar, StyleSheet, View} from "react-native";
import {SplashScreen} from "expo";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";

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
			>
				<Stack.Navigator>
					<Stack.Screen name="Root" component={BottomTabNavigator} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
