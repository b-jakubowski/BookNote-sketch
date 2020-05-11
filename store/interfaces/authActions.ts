import { LOG_IN_USER, LOG_OUT_USER } from "../../constants/ActionTypes";
import { User } from "../../interfaces/user.interface";

export interface logInUserAction {
	type: typeof LOG_IN_USER;
	payload: User;
}

export interface logOutUserAction {
	type: typeof LOG_OUT_USER;
}

export type AuthActionTypes = logInUserAction | logOutUserAction;
