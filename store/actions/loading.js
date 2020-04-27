import {SET_LOADING_COMPLETE, SET_LOADING} from "../../constants/ActionTypes";

export const setLoading = () => ({
	type: SET_LOADING,
});

export const setLoadingComplete = () => ({
	type: SET_LOADING_COMPLETE,
});
