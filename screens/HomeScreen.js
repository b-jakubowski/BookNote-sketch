import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AuthScreen from "./AuthScreen";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import BookDetailsScreen from "./BookDetailsScreen";
import EditQuoteScreen from "./EditQuoteScreen";
import {connect} from "react-redux";

const Stack = createStackNavigator();

const HomeScreen = ({user}) => {
	return (
		<>
			{user ? (
				<Stack.Navigator>
					<Stack.Screen name="Books" component={BottomTabNavigator} />
					<Stack.Screen name="BookDetails" component={BookDetailsScreen} />
					<Stack.Screen name="EditQuote" component={EditQuoteScreen} />
				</Stack.Navigator>
			) : (
				<AuthScreen />
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.authReducer.user,
});

export default connect(mapStateToProps)(HomeScreen);
