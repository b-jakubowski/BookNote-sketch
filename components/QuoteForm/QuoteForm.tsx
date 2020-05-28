import React from "react";
import { View, Text, Item, Textarea } from "native-base";
import CategoryCheckBox from "./CategoryCheckBox";
import { categoriesButtons } from "../../constants/Categories";
import styled from "styled-components";
import {
	foregroundColor,
	spacing,
	gray,
	black,
	noteText,
	titleTextColor,
	fontSize,
} from "../../constants/Theme";
import { useTheme } from "../../context/ThemeContext";

interface Props {
	quote: string;
	onChangeText: (text: string) => void;
	onPress: (category: string) => void;
	categoriesCheck: string[];
}

const FormItem = styled(View)`
	background-color: ${foregroundColor};
	margin-bottom: ${spacing.m};
	padding: ${spacing.m};
`;
const Categories = styled(View)`
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`;
const QuoteTextArea = styled(Textarea)`
	color: ${titleTextColor};
	width: 100%;
	font-size: ${fontSize.m};
	height: 100%;
`;

const QuoteForm: React.FC<Props> = ({
	quote,
	onChangeText,
	onPress,
	categoriesCheck,
}) => {
	const theme = useTheme();

	const textColor = theme.mode === "dark" ? gray[100] : black;

	return (
		<FormItem>
			<Text note>Categories</Text>
			<Categories>
				{categoriesButtons.map((category, index) => (
					<View key={index}>
						<CategoryCheckBox
							category={category}
							checked={categoriesCheck.includes(category)}
							onPress={() => onPress(category)}
						/>
					</View>
				))}
			</Categories>
			<Text note>Quote</Text>
			<Item>
				<QuoteTextArea
					rowSpan={5}
					underline={true}
					bordered
					placeholderTextColor={textColor}
					placeholder="Quote"
					onChangeText={onChangeText}
					value={quote}
				/>
			</Item>
		</FormItem>
	);
};

export default QuoteForm;
