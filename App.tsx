import React, { useState, useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import configureStore from "./store/store";
import { Root } from "native-base";
import { ThemeManager } from "./context/ThemeContext";
import Navigation from "./navigation/Navigation";

interface Props {
	skipLoadingScreen: boolean;
}

const store = configureStore();

const App: React.FC<Props> = ({ skipLoadingScreen }) => {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHideAsync();

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
				SplashScreen.hideAsync();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return !isLoadingComplete && !skipLoadingScreen ? null : (
		<Root>
			<ThemeManager>
				<Provider store={store}>
					{Platform.OS === "ios" && <StatusBar barStyle="default" />}
					<Navigation />
				</Provider>
			</ThemeManager>
		</Root>
	);
};

export default App;
