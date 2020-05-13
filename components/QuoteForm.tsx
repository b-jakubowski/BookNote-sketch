import React, { useState } from "react";
import { View, Text, Item, Textarea } from "native-base";
import { StyleSheet } from "react-native";
import CategoryCheckBox from "./CategoryCheckBox";

interface Props {
	quote: string;
	onChangeText: (text: string) => void;
	onPress: (category: string) => void;
	categoriesCheck: string[];
}

const categoriesButtons = [
	"motivation",
	"love",
	"wisdom",
	"time",
	"happiness",
	"funny",
	"success",
	"productivity",
];

const QuoteForm: React.FC<Props> = ({
	quote,
	onChangeText,
	onPress,
	categoriesCheck,
}) => {
	// const [categoriesCheck, setCategoriesCheck] = useState<string[]>([]);

	// const toggleCategory = (category: string) => {
	// 	if (categoriesCheck.includes(category)) {
	// 		setCategoriesCheck(categoriesCheck.filter((c) => c !== category));
	// 	} else {
	// 		setCategoriesCheck([...categoriesCheck, category]);
	// 	}
	// };

	return (
		<View style={styles.formItem}>
			<Text note>Categories</Text>
			<View style={styles.categories}>
				{categoriesButtons.map((category, index) => (
					<View key={index}>
						<CategoryCheckBox
							category={category}
							checked={categoriesCheck.includes(category)}
							// onPress={() => toggleCategory(category)}
							onPress={() => onPress(category)}
						/>
					</View>
				))}
			</View>
			<Text note>Quote</Text>
			<Item>
				<Textarea
					rowSpan={5}
					bordered
					style={styles.quoteField}
					placeholder="Quote"
					onChangeText={onChangeText}
					value={quote}
				/>
			</Item>
		</View>
	);
};

const styles = StyleSheet.create({
	categories: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	formItem: {
		marginBottom: 15,
	},
	quoteField: {
		width: "100%",
	},
});

export default QuoteForm;
