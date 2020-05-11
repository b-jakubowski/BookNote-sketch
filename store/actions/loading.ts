import { SET_LOADING_COMPLETE, SET_LOADING } from "../../constants/ActionTypes";
import {
	setLoadingAction,
	setLoadingCompleteAction,
} from "../interfaces/loadingActions";

export const setLoading = (): setLoadingAction => ({
	type: SET_LOADING,
});

export const setLoadingComplete = (): setLoadingCompleteAction => ({
	type: SET_LOADING_COMPLETE,
});
