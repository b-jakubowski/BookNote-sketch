import {setLoading, setLoadingComplete} from "../loading";

describe("loading actions", () => {
	it("setLoading should create SET_LOADING action", () => {
		expect(setLoading()).toEqual({
			type: "SET_LOADING",
		});
	});

	it("setLoadingComplete should create SET_LOADING_COMPLETE action", () => {
		expect(setLoadingComplete()).toEqual({
			type: "SET_LOADING_COMPLETE",
		});
	});
});
