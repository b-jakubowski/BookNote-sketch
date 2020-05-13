import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import AuthScreen from "./AuthScreen";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import BookDetailsScreen from "./BookDetailsScreen";
import AddQuoteScreen from "./AddQuoteScreen";
import CameraScreen from "./CameraScreen";
import EditBookDetailsScreen from "./EditBookDetailsScreen";
import { User } from "../interfaces/user.interface";
import { BookDetails, Quote } from "../interfaces/book.interface";

export type StackParamList = {
	Books: undefined;
	"Book details": { id: string };
	"Add/Edit Quote": {
		bookId: string;
		quoteId: string;
		quote: string;
		categories: string[];
		isEdit: boolean;
	};
	Camera: {
		isEdit: boolean;
	};
	"Edit book details": {
		id: string;
		initialBookValues: BookDetails;
	};
};

interface Props {
	user: User;
	loading: boolean;
}

interface StateProps {
	auth: User;
	globalLoading: {
		loading: boolean;
	};
}

const Stack = createStackNavigator<StackParamList>();

const stackScreenOptions = {
	headerBackTitleVisible: false,
	headerTitleAlign: "center",
};

const HomeScreen: React.FC<Props> = ({ user, loading }) => {
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
};

const mapStateToProps = (state: StateProps) => ({
	user: state.auth,
	loading: state.globalLoading.loading,
});

export default connect(mapStateToProps)(HomeScreen);
