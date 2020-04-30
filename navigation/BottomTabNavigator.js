import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";
import {connect} from "react-redux";
import {Button, Icon} from "native-base";
import PropTypes from "prop-types";

import TabBarIcon from "../components/TabBarIcon";
import BooksScreen from "../screens/BooksScreen";
import QuotesScreen from "../screens/QuotesScreen";
import AddBookScreen from "../screens/AddBookScreen";
import DailyQuoteScreen from "../screens/DailyQuoteScreen";
import {signOut} from "../constants/Firebase";
import {logOutUser} from "../store/actions/auth";
import {clearBooks} from "../store/actions/quote";
import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

function BottomTabNavigator({logOutUser, clearBooks, navigation, route}) {
	navigation.setOptions({
		headerTitle:
			route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME,
		headerRight: () => (
			<Button
				warning
				transparent
				style={{flex: 1, marginRight: 10}}
				onPress={() =>
					signOut()
						.then(() => {
							clearBooks();
							logOutUser();
						})
						.catch()
				}
			>
				<Icon ios="ios-log-out" android="md-exit" />
			</Button>
		),
	});

	return (
		<BottomTab.Navigator
			initialRouteName={INITIAL_ROUTE_NAME}
			tabBarOptions={{activeTintColor: Colors.darkOrange}}
		>
			<BottomTab.Screen
				name="Books"
				component={BooksScreen}
				options={{
					tabBarLabel: "Books",
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
					tabBarOptions: {
						activeBackgroundColor: "red",
					},
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-shuffle" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Quotes"
				title="Quotes"
				component={QuotesScreen}
				options={{
					// title: "Quotes",
					tabBarOptions: {
						activeBackgroundColor: "red",
						activeTintColor: "red",
					},
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
					tabBarOptions: {
						activeBackgroundColor: "green",
						inactiveTintColor: "red",
					},
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

BottomTabNavigator.propTypes = {
	logOutUser: PropTypes.func,
	clearBooks: PropTypes.func,
	navigation: PropTypes.object,
	route: PropTypes.object,
};

export default connect(null, {logOutUser, clearBooks})(BottomTabNavigator);
