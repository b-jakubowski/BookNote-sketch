import React, {useState, useRef, useEffect} from "react";
import {Platform, StatusBar} from "react-native";
import {SplashScreen} from "expo";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import PropTypes from "prop-types";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";

import useLinking from "./navigation/useLinking";
import configureStore from "./store/store";
import {Root, Container} from "native-base";
import HomeScreen from "./screens/HomeScreen";

const store = configureStore();

console.ignoredYellowBox = ["Setting a timer"];

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false);
	const [initialNavigationState, setInitialNavigationState] = useState();
	const containerRef = useRef();
	const {getInitialState} = useLinking(containerRef);

	useEffect(() => {
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
					<NavigationContainer
						ref={containerRef}
						initialState={initialNavigationState}
						initialRouteName="Books"
					>
						<HomeScreen />
					</NavigationContainer>
				</Container>
			</Root>
		</Provider>
	);
}

App.propTypes = {
	skipLoadingScreen: PropTypes.bool,
};
