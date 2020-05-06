import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AuthScreen from "./AuthScreen";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import BookDetailsScreen from "./BookDetailsScreen";
import AddQuoteScreen from "./AddQuoteScreen";
import CameraScreen from "./CameraScreen";
import EditBookDetailsScreen from "./EditBookDetailsScreen";

const Stack = createStackNavigator();

const stackScreenOptions = {
	headerBackTitleVisible: false,
	headerTitleAlign: "center",
};

function HomeScreen({user, loading}) {
	return (
		<>
			{user.uid && !loading ? (
				<Stack.Navigator>
					<Stack.Screen
						name="Books"
						component={BottomTabNavigator}
						options={stackScreenOptions}
					/>
					<Stack.Screen
						name="Book details"
						component={BookDetailsScreen}
						options={stackScreenOptions}
					/>
					<Stack.Screen
						name="Add/Edit Quote"
						component={AddQuoteScreen}
						options={stackScreenOptions}
					/>
					<Stack.Screen
						name="Camera"
						component={CameraScreen}
						options={stackScreenOptions}
					/>
					<Stack.Screen
						name="Edit book details"
						component={EditBookDetailsScreen}
						options={stackScreenOptions}
					/>
				</Stack.Navigator>
			) : (
				<AuthScreen />
			)}
		</>
	);
}

HomeScreen.propTypes = {
	user: PropTypes.object,
	loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.auth,
	loading: state.globalLoading.loading,
});

export default connect(mapStateToProps)(HomeScreen);
