import { SET_LOADING, SET_LOADING_COMPLETE } from "../../constants/ActionTypes";

export interface setLoadingAction {
	type: typeof SET_LOADING;
}

export interface setLoadingCompleteAction {
	type: typeof SET_LOADING_COMPLETE;
}

export type LoadingActionTypes = setLoadingAction | setLoadingCompleteAction;
