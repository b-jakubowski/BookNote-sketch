import {LOG_OUT_USER, LOG_IN_USER} from "../../constants/ActionTypes";

export const logInUser = ({displayName, email, uid}) => ({
	type: LOG_IN_USER,
	payload: {displayName, email, uid},
});

export const DeleteBook = () => ({
	type: LOG_OUT_USER,
});
