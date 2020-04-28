import authReducer from "../authReducer";

const mockUser = {
	displayName: "John Test Doe",
	email: "john@spec.com",
	uid: "123abc",
};

describe("auth reducer", () => {
	it("should handle initial state", () => {
		expect(authReducer(undefined, {})).toEqual({user: null});
	});

	it("should handle LOG_IN_USER", () => {
		expect(
			authReducer({user: null}, {type: "LOG_IN_USER", payload: mockUser})
		).toEqual({user: mockUser});
	});

	it("should handle LOG_OUT_USER", () => {
		expect(authReducer({user: mockUser}, {type: "LOG_OUT_USER"})).toEqual({
			user: null,
		});
	});
});
