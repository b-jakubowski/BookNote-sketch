import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AuthScreen from "./AuthScreen";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import BookDetailsScreen from "./BookDetailsScreen";
import AddQuoteScreen from "./AddQuoteScreen";

const Stack = createStackNavigator();

function HomeScreen({user}) {
	return (
		<>
			{user ? (
				<Stack.Navigator>
					<Stack.Screen name="Books" component={BottomTabNavigator} />
					<Stack.Screen name="Book details" component={BookDetailsScreen} />
					<Stack.Screen name="Add Quote" component={AddQuoteScreen} />
				</Stack.Navigator>
			) : (
				<AuthScreen />
			)}
		</>
	);
}

HomeScreen.propTypes = {
	user: PropTypes.object,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps)(HomeScreen);
