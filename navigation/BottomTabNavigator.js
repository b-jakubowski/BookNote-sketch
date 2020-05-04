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
import ReadingListScreen from "../screens/ReadingListScreen";

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
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-book" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Daily Quote"
				component={DailyQuoteScreen}
				options={{
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-shuffle" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Reading list"
				component={ReadingListScreen}
				options={{
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-list" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Quotes"
				component={QuotesScreen}
				options={{
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-quote" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Add Book"
				component={AddBookScreen}
				options={{
					tabBarIcon: ({focused}) => (
						<TabBarIcon focused={focused} name="md-add-circle-outline" />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

BottomTabNavigator.propTypes = {
	logOutUser: PropTypes.func,
	clearBooks: PropTypes.func,
	navigation: PropTypes.object,
	route: PropTypes.object,
};

export default connect(null, {logOutUser, clearBooks})(BottomTabNavigator);
