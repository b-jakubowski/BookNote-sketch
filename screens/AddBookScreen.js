import React, {useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {Container, Content, Form, Text, Toast, Button, View} from "native-base";
import {useNavigation} from "@react-navigation/native";
import {connect} from "react-redux";
import * as yup from "yup";
import {addBook} from "../store/actions/quote";
import QuoteForm from "../components/QuoteForm";
import CategoryCheckBox from "../components/CategoryCheckBox";
import {firestore} from "../constants/Firebase";
import BookDetailsFields from "../components/BookDetailsFields";
import {bookDetailsSchema, categoriesSchema} from "../constants/Schemas";

const initialForm = {
	name: "",
	author: "",
	cover: "",
	quote: "",
	categories: {
		motivation: false,
		love: false,
		wisdom: false,
		time: false,
		happiness: false,
		funny: false,
		success: false,
		productivity: false,
	},
};

const bookSchema = yup.object({
	...bookDetailsSchema,
	categories: categoriesSchema,
	quote: yup.string().required().min(5),
});

const categoriesMapped = (categories) =>
	Object.keys(categories).filter((category) => categories[category]);

function AddBookScreen({user, addBook}) {
	const navigation = useNavigation();
	const [form, setForm] = useState(initialForm);

	const handleCreateBook = async (book) => {
		const docRef = await firestore.collection("books").add(book);
		const doc = await docRef.get();

		const bookFirestore = {
			id: doc.id,
			...doc.data(),
		};

		addBook(bookFirestore);
	};

	const handleSubmit = ({quote, categories, ...book}) => {
		const newBook = {
			...book,
			createdAt: new Date(),
			userId: user.uid,
			quotes: [
				{
					id: `${Math.random()}`,
					categories: categoriesMapped(categories),
					quote,
				},
			],
		};

		bookSchema
			.validate(form, {abortEarly: false})
			.then(() => {
				handleCreateBook(newBook);
				setForm(initialForm);
				navigation.navigate("Books");
			})
			.catch((e) => {
				Toast.show({
					text: e.errors.join(",\r\n"),
					buttonText: "Okay",
					type: "warning",
					duration: 10000000,
				});
			});
	};

	const toggleCategory = (category) => {
		setForm({
			...form,
			categories: {
				...form.categories,
				[category]: !form.categories[category],
			},
		});
	};

	return (
		<Container>
			<Content style={styles.content}>
				<Form>
					<BookDetailsFields
						name={form.name}
						author={form.author}
						cover={form.cover}
						status={form.status}
						setForm={setForm}
						form={form}
					/>
					<Text note>Categories</Text>
					<View style={styles.categories}>
						{Object.keys(initialForm.categories).map((category, index) => (
							<View key={index}>
								<CategoryCheckBox
									category={category}
									checked={form.categories[category]}
									onPress={() => toggleCategory(category)}
								/>
							</View>
						))}
					</View>
					<QuoteForm
						categories={form.categories}
						quote={form.quote}
						onChangeText={(value) => setForm({...form, quote: value})}
					/>
					<View style={styles.buttonsContainer}>
						<Button
							title="submit"
							block
							style={styles.button}
							onPress={() => handleSubmit(form)}
						>
							<Text>Add Quote</Text>
						</Button>
						<Button
							title="submit"
							block
							danger
							style={styles.button}
							onPress={() => setForm(initialForm)}
						>
							<Text>Clear Form</Text>
						</Button>
					</View>
				</Form>
			</Content>
		</Container>
	);
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		margin: 5,
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	categories: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	content: {
		padding: 10,
	},
});

AddBookScreen.propTypes = {
	addBook: PropTypes.func,
	user: PropTypes.object,
};

const mapStateToProps = (state) => ({
	user: state.authReducer.user,
});

export default connect(mapStateToProps, {addBook})(AddBookScreen);
