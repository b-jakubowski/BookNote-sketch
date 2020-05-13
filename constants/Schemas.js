import * as yup from "yup";

export const bookDetailsSchema = {
	name: yup.string().required().min(2),
	author: yup.string().required().min(2),
};

export const categoriesSchema = yup.object({
	motivation: yup.boolean(),
	love: yup.boolean(),
	wisdom: yup.boolean(),
	time: yup.boolean(),
	happiness: yup.boolean(),
	funny: yup.boolean(),
	success: yup.boolean(),
	productivity: yup.boolean(),
});

export const quoteSchema = yup.object({
	quote: yup.string().required().min(5),
	categories: yup.array().of(yup.string()),
});
