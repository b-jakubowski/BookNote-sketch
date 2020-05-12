import { combineReducers, createStore } from "redux";
import bookReducer from "./reducers/bookReducer";
import authReducer from "./reducers/authReducer";
import loadingReducer from "./reducers/loadingReducer";
import { Book } from "../interfaces/book.interface";
import { User } from "../interfaces/user.interface";

export interface Store {
	books: Book[];
	auth: User;
	globalLoading: {
		loading: boolean;
	};
}

const rootReducer = combineReducers({
	books: bookReducer,
	auth: authReducer,
	globalLoading: loadingReducer,
});

const configureStore = () =>
	createStore(
		rootReducer,
		(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
			(window as any).__REDUX_DEVTOOLS_EXTENSION__()
	);

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore;
