import loadingReducer from "../loadingReducer";

describe("loading reducer", () => {
	it("should handle initial state", () => {
		expect(loadingReducer(undefined, {})).toEqual({loading: false});
	});

	it("should handle SET_LOADING", () => {
		expect(loadingReducer({loading: null}, {type: "SET_LOADING"})).toEqual({
			loading: true,
		});
	});

	it("should handle SET_LOADING_COMPLETE", () => {
		expect(
			loadingReducer({loading: true}, {type: "SET_LOADING_COMPLETE"})
		).toEqual({
			loading: false,
		});
	});
});
