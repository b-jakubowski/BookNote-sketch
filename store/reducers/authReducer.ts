import { LOG_IN_USER, LOG_OUT_USER } from "../../constants/ActionTypes";
import { AuthActionTypes } from "../interfaces/authActions";
import { User } from "../../interfaces/user.interface";

const authReducer = (state = {}, action: AuthActionTypes): User | {} => {
	switch (action.type) {
		case LOG_IN_USER:
			return {
				...state,
				...action.payload,
			};
		case LOG_OUT_USER:
			return {};
		default:
			return state;
	}
};

export default authReducer;
