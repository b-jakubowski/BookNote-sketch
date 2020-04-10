import {combineReducers, createStore} from "redux";
import quoteReducer from "./reducers/quoteReducer";

const rootReducer = combineReducers({
	quoteReducer,
});

const configureStore = () =>
	createStore(
		rootReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

export default configureStore;
