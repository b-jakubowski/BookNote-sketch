import React, {useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {Container, Content, Form, Text, Button, View} from "native-base";
import {addQuoteToBook} from "../store/actions/quote";
import {connect} from "react-redux";
import CategoryCheckBox from "../components/CategoryCheckBox";
import QuoteForm from "../components/QuoteForm";

const initialForm = {
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

const categoriesMapped = (categories) =>
	Object.keys(categories).filter((category) => categories[category]);

const EditQuoteScreen = ({route, addQuoteToBook}) => {
	const [form, setForm] = useState(initialForm);

	const handleSubmit = ({quote, categories}) => {
		const formValues = {
			id: `${Math.random()}`,
			categories: categoriesMapped(categories),
			quote,
		};

		addQuoteToBook(formValues, route.params.id);
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
					<View style={styles.formItem}>
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
					</View>
					<QuoteForm
						categories={form.categories}
						quote={form.quote}
						onChangeText={(value) => setForm({...form, quote: value})}
					/>
					<Button title="submit" block onPress={() => handleSubmit(form)}>
						<Text>Add Quote</Text>
					</Button>
					<Button
						title="submit"
						block
						danger
						onPress={() => setForm(initialForm)}
					>
						<Text>Clear Form</Text>
					</Button>
				</Form>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	categories: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	content: {
		padding: 10,
	},
	formItem: {
		marginBottom: 15,
	},
});

EditQuoteScreen.propTypes = {
	addQuoteToBook: PropTypes.func,
};

export default connect(null, {addQuoteToBook})(EditQuoteScreen);
