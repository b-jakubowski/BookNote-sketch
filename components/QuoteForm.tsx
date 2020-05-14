import React, { useState } from "react";
import { View, Text, Item, Textarea } from "native-base";
import { StyleSheet } from "react-native";
import CategoryCheckBox from "./CategoryCheckBox";
import { categoriesButtons } from "../constants/Categories";

interface Props {
	quote: string;
	onChangeText: (text: string) => void;
	onPress: (category: string) => void;
	categoriesCheck: string[];
}

const QuoteForm: React.FC<Props> = ({
	quote,
	onChangeText,
	onPress,
	categoriesCheck,
}) => {
	return (
		<View style={styles.formItem}>
			<Text note>Categories</Text>
			<View style={styles.categories}>
				{categoriesButtons.map((category, index) => (
					<View key={index}>
						<CategoryCheckBox
							category={category}
							checked={categoriesCheck.includes(category)}
							onPress={() => onPress(category)}
						/>
					</View>
				))}
			</View>
			<Text note>Quote</Text>
			<Item>
				<Textarea
					rowSpan={5}
					underline={true}
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
