import {logInUser, logOutUser} from "../auth";

const mockUser = {
	displayName: "John Test Doe",
	email: "john@spec.com",
	uid: "123abc",
};

describe("auth actions", () => {
	it("logInUser should create LOG_IN_USER action", () => {
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
