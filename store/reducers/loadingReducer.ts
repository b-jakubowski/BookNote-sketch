import { SET_LOADING, SET_LOADING_COMPLETE } from "../../constants/ActionTypes";
import { LoadingActionTypes } from "../interfaces/loadingActions";

interface Loading {
	loading: boolean;
}

const initialState: Loading = {
	loading: false,
};

const loadingReducer = (
	state = initialState,
	action: LoadingActionTypes
): Loading => {
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
