import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Button, Icon } from "native-base";
import { StyleSheet } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import TabBarIcon from "../components/TabBarIcon";
import BooksScreen from "../screens/bottom-navigation/BooksScreen";
import QuotesScreen from "../screens/bottom-navigation/QuotesScreen";
import DailyQuoteScreen from "../screens/bottom-navigation/DailyQuoteScreen";
import Colors from "../constants/Colors";
import ReadingListScreen from "../screens/bottom-navigation/ReadingListScreen";
import styled from "styled-components";
import { iconColor } from "../constants/Theme";
import { useTheme } from "../context/ThemeContext";
import { BottomStackParamList } from "./types";

interface Props {
	navigation: StackNavigationHelpers;
	route: any;
}
const IconTheme = styled(Icon)`
	color: ${iconColor};
`;

const BottomTab = createBottomTabNavigator<BottomStackParamList>();

const BottomTabNavigator: React.FC<Props> = ({ navigation, route }) => {
	const theme = useTheme();

	navigation.setOptions({
		headerTitle: route.state?.routes[route.state.index]?.name,
		headerRight: () => (
			<Button transparent onPress={() => navigation.navigate("User details")}>
				<IconTheme type="FontAwesome" name="user-circle-o" />
			</Button>
		),
		headerLeft: () => (
			<Button transparent onPress={() => theme.toggle()}>
				<IconTheme
					type="Feather"
					name={theme.mode === "dark" ? "moon" : "sun"}
				/>
			</Button>
		),
	});

	return (
		<BottomTab.Navigator tabBarOptions={{ activeTintColor: Colors.darkOrange }}>
			<BottomTab.Screen
				name="Books"
				component={BooksScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabBarIcon
							focused={focused}
							type="FontAwesome5"
							name="book-open"
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="Daily Quote"
				component={DailyQuoteScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} type="MaterialIcons" name="today" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Reading list"
				component={ReadingListScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} type="FontAwesome" name="list" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Quotes"
				component={QuotesScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabBarIcon
							focused={focused}
							type="FontAwesome"
							name="quote-right"
						/>
					),
				}}
			/>
		</BottomTab.Navigator>
	);
};

export default BottomTabNavigator;
