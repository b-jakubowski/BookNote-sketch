import {SET_LOADING, SET_LOADING_COMPLETE} from "../../constants/ActionTypes";

export const initialState = {
	loading: false,
};

const loadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				loading: true,
			};
		case SET_LOADING_COMPLETE:
			return {
				loading: false,
			};
		default:
			return state;
	}
};

export default loadingReducer;
