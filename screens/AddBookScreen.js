import React, {useState} from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {
	Container,
	Content,
	Item,
	Input,
	Form,
	Text,
	Toast,
	Button,
	View,
	Picker,
	Icon,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import {useNavigation} from "@react-navigation/native";
import {addBook} from "../store/actions/quote";
import {connect} from "react-redux";
import QuoteForm from "../components/QuoteForm";
import CategoryCheckBox from "../components/CategoryCheckBox";
import * as yup from "yup";

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
	name: yup.string().required().min(2),
	author: yup.string().required().min(2),
	cover: yup.string().required().min(5),
	quote: yup.string().required().min(5),
	categories: yup.object({
		motivation: yup.boolean(),
		love: yup.boolean(),
		wisdom: yup.boolean(),
		time: yup.boolean(),
		happiness: yup.boolean(),
		funny: yup.boolean(),
		success: yup.boolean(),
		productivity: yup.boolean(),
	}),
});

const categoriesMapped = (categories) =>
	Object.keys(categories).filter((category) => categories[category]);

const AddBookScreen = (props) => {
	const navigation = useNavigation();
	const [form, setForm] = useState(initialForm);

	const handleSubmit = ({name, author, cover, quote, categories, status}) => {
		bookSchema
			.validate(form, {abortEarly: false})
			.then(() => {
				props.addBook({
					id: `${Math.random()}`,
					name,
					author,
					cover,
					status,
					quotes: [
						{
							id: `${Math.random()}`,
							categories: categoriesMapped(categories),
							quote,
						},
					],
				});

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

	const getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

			if (status !== "granted") {
				alert("Sorry, we need camera roll permissions to make this work!");
				return;
			}
			_pickImage();
		}
		_pickImage();
	};

	const _pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1.6],
				quality: 0.2,
			});
			if (!result.cancelled) {
				setForm({...form, cover: result.uri});
			}
		} catch (E) {
			console.log(E);
		}
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
								style={styles.coverInput}
								onChangeText={(value) => setForm({...form, cover: value})}
								value={form.cover}
							/>
							<Button
								style={styles.coverButton}
								onPress={() => getPermissionAsync()}
							>
								<Text>Choose img</Text>
							</Button>
						</Item>
						<Item picker>
							<Picker
								mode="dropdown"
								iosIcon={<Icon name="arrow-down" />}
								style={{width: undefined}}
								placeholder="Reading status"
								placeholderIconColor="#007aff"
								selectedValue={form.status}
								onValueChange={(value) => setForm({...form, status: value})}
							>
								<Picker.Item label="To read" value="To read" />
								<Picker.Item label="Reading" value="Reading" />
								<Picker.Item label="Read" value="Read" />
							</Picker>
						</Item>
					</View>
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
};

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
	coverButton: {
		flex: 1,
		margin: 5,
	},
	coverInput: {
		flex: 2,
	},
	formItem: {
		marginBottom: 15,
	},
});

AddBookScreen.propTypes = {
	addBook: PropTypes.func,
};

export default connect(null, {addBook})(AddBookScreen);
