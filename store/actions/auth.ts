import { LOG_OUT_USER, LOG_IN_USER } from "../../constants/ActionTypes";
import { logInUserAction, logOutUserAction } from "../interfaces/authActions";
import { User } from "../../interfaces/user.interface";

export const logInUser = ({ email, uid }: User): logInUserAction => ({
	type: LOG_IN_USER,
	payload: { email, uid },
});

export const logOutUser = (): logOutUserAction => ({
	type: LOG_OUT_USER,
});
