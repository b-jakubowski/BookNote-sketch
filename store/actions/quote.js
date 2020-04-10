import {ADD_QUOTE, DELETE_QUOTE} from "../../constants/ActionTypes";

export const addQuote = (quote) => ({
	type: ADD_QUOTE,
	payload: quote,
});

export const DeleteQuote = (id) => ({
	type: DELETE_QUOTE,
	payload: id,
});
