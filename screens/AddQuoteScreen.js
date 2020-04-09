import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {
	Container,
	Content,
	Item,
	Input,
	Form,
	Text,
	Button,
	Textarea,
	View,
	CheckBox,
} from "native-base";

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

export default function AddQuoteScreen() {
	const [form, setForm] = useState(initialForm);
	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<Container>
			<Content style={styles.content}>
				<Form>
					<View style={styles.formItem}>
						<Text note>Book</Text>
						<Item>
							<Input
								placeholder="Name"
								onChangeText={(value) => setForm({...form, name: value})}
								value={form.name}
							/>
						</Item>
						<Item>
							<Input
								placeholder="Author"
								onChangeText={(value) => setForm({...form, author: value})}
								value={form.author}
							/>
						</Item>
						<Item>
							<Input
								placeholder="Cover URL"
								onChangeText={(value) => setForm({...form, cover: value})}
								value={form.cover}
							/>
						</Item>
					</View>
					<View style={styles.formItem}>
						<Text note>Categories</Text>
						<View style={styles.categories}>
							{Object.keys(initialForm.categories).map((category, index) => (
								<View key={index}>
									<Button
										small
										style={styles.categoryButton}
										onPress={() => {
											setForm({
												...form,
												categories: {
													...form.categories,
													[category]: !form.categories[category],
												},
											});
										}}
									>
										<CheckBox
											name={category}
											value={category}
											checked={form.categories[category]}
											onPress={() => {
												setForm({
													...form,
													categories: {
														...form.categories,
														[category]: !form.categories[category],
													},
												});
											}}
										/>
										<Text>{category}</Text>
									</Button>
								</View>
							))}
						</View>
					</View>
					<View style={styles.formItem}>
						<Text note>Quote</Text>
						<Item>
							<Textarea
								rowSpan={5}
								bordered
								style={styles.quoteField}
								placeholder="Quote"
								onChangeText={(value) => setForm({...form, quote: value})}
								value={form.quote}
							/>
						</Item>
					</View>
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
}

const styles = StyleSheet.create({
	categories: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	categoryButton: {
		marginRight: 5,
		marginTop: 5,
	},
	content: {
		padding: 10,
	},
	formItem: {
		marginBottom: 15,
	},
	quoteField: {
		width: "100%",
	},
});
