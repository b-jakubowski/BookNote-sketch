import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Button, Icon } from "native-base";

import TabBarIcon from "../components/TabBarIcon";
import BooksScreen from "../screens/BooksScreen";
import QuotesScreen from "../screens/QuotesScreen";
import AddBookScreen from "../screens/AddBookScreen";
import DailyQuoteScreen from "../screens/DailyQuoteScreen";
import Colors from "../constants/Colors";
import ReadingListScreen from "../screens/ReadingListScreen";
import { StyleSheet } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

export type BottomStackParamList = {
	"Add Book": { uri: string };
	"Daily Quote": undefined;
	"Reading list": undefined;
	Quotes: undefined;
	Books: undefined;
};

interface Props {
	navigation: StackNavigationHelpers;
}

const BottomTab = createBottomTabNavigator<BottomStackParamList>();

const BottomTabNavigator: React.FC<Props> = ({ navigation }) => {
	navigation.setOptions({
		headerRight: () => (
			<Button
				transparent
				style={styles.logoutButton}
				onPress={() => navigation.navigate("User details")}
			>
				<Icon
					type="FontAwesome"
					name="user-circle-o"
					style={styles.logoutIcon}
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
			<BottomTab.Screen
				name="Add Book"
				component={AddBookScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabBarIcon type="AntDesign" focused={focused} name="pluscircle" />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
};

const styles = StyleSheet.create({
	logoutButton: {
		flex: 1,
		marginRight: 10,
	},
	logoutIcon: {
		color: Colors.blackChocolate,
	},
});

export default BottomTabNavigator;
