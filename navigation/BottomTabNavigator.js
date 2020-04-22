import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import BooksScreen from "../screens/BooksScreen";
import QuotesScreen from "../screens/QuotesScreen";
import AddBookScreen from "../screens/AddBookScreen";
import DailyQuoteScreen from "../screens/DailyQuoteScreen";
import {Button, Text, Icon} from "native-base";
import {signOut} from "../constants/Firebase";
import {connect} from "react-redux";
import {logOutUser} from "../store/actions/auth";
import {clearBooks} from "../store/actions/quote";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

function BottomTabNavigator({logOutUser, clearBooks, navigation, route}) {
	navigation.setOptions({
		headerTitle: getHeaderTitle(route),
		headerRight: () => (
			<Button
				iconRight
				info
				transparent
				style={{marginRight: 15}}
				onPress={() =>
					signOut()
						.then(() => {
							clearBooks();
							logOutUser();
						})
						.catch()
				}
			>
				<Text warning>logout</Text>
				<Icon ios="ios-log-out" android="md-exit" />
			</Button>
		),
	});

	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				name="Books"
				component={BooksScreen}
				options={{
					title: "Books",
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-book" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Daily Quote"
				component={DailyQuoteScreen}
				options={{
					title: "Daily Quote",
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-shuffle" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Quotes"
				component={QuotesScreen}
				options={{
					title: "Quotes",
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-quote" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Add Book"
				component={AddBookScreen}
				options={{
					title: "Add Book",
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-add-circle-outline" />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

function getHeaderTitle(route) {
	const routeName =
		route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

	switch (routeName) {
		case "Books":
			return "Books";
		case "Quotes":
			return "Quotes";
		case "Add Book":
			return "Add Book";
		case "Daily Quote":
			return "Daily Quote";
	}
}

export default connect(null, {logOutUser, clearBooks})(BottomTabNavigator);
