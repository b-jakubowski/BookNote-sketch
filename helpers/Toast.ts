import { Toast } from "native-base";

export const showWarnToast = (message: string) => {
	Toast.show({
		text: message,
		buttonText: "Okay",
		type: "warning",
		duration: 10000000,
	});
};
