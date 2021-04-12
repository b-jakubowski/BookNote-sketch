import { Toast } from "native-base";

export const showWarnToast = (error: { errors: any }, isString?: boolean) => {
	const message = isString ? error : error.errors.join(",\r\n");

	Toast.show({
		text: message,
		buttonText: "Okay",
		type: "warning",
		duration: 10000000,
	});
};
