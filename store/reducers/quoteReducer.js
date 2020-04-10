import {ADD_QUOTE, DELETE_QUOTE} from "../../constants/ActionTypes";
import {booksMock} from "../../assets/mocks/books";

export const initialState = {
	quotes: booksMock,
};

const quoteReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_QUOTE:
			return {
				...state,
				quotes: [...state.quotes, action.payload],
			};
		case DELETE_QUOTE:
			return {
				...state,
				quotes: [state.quotes.filter((item) => item.id !== action.id)],
			};
		default:
			return state;
	}
};

export default quoteReducer;
