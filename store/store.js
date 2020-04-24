import {combineReducers, createStore} from "redux";
import quoteReducer from "./reducers/quoteReducer";
import authReducer from "./reducers/authReducer";
import loadingReducer from "./reducers/loadingReducer";

const rootReducer = combineReducers({
	books: quoteReducer,
	auth: authReducer,
	globalLoading: loadingReducer,
});

const configureStore = () =>
	createStore(
		rootReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

export default configureStore;
