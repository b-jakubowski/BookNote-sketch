import {LOG_IN_USER, LOG_OUT_USER} from "../../constants/ActionTypes";

export const initialState = {
	user: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN_USER:
			return {
				...state,
				user: action.payload,
			};
		case LOG_OUT_USER:
			return {
				user: null,
			};
		default:
			return state;
	}
};

export default authReducer;
