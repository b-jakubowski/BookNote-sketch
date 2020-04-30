import authReducer from "../authReducer";

const mockUser = {
	displayName: "John Test Doe",
	email: "john@spec.com",
	uid: "123abc",
};

describe("auth reducer", () => {
	it("should handle initial state", () => {
		expect(authReducer(undefined, {})).toEqual({});
	});

	it("should handle LOG_IN_USER", () => {
		expect(authReducer({}, {type: "LOG_IN_USER", payload: mockUser})).toEqual(
			mockUser
		);
	});

	it("should handle LOG_OUT_USER", () => {
		expect(authReducer(mockUser, {type: "LOG_OUT_USER"})).toEqual({});
	});
});
