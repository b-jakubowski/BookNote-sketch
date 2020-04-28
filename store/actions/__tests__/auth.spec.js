import {logInUser, logOutUser} from "../auth";

describe("auth actions", () => {
	it("logInUser should create LOG_IN_USER action", () => {
		const mockUser = {
			displayName: "John Test Doe",
			email: "john@spec.com",
			uid: "123abc",
		};

		expect(logInUser(mockUser)).toEqual({
			type: "LOG_IN_USER",
			payload: mockUser,
		});
	});

	it("logOutUser should create LOG_IN_USER action", () => {
		expect(logOutUser()).toEqual({
			type: "LOG_OUT_USER",
		});
	});
});
