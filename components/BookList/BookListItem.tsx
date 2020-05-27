import React from "react";
import { View, Image } from "react-native";
import { Text, CardItem, ListItem, H3 } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Quote, Book } from "../../interfaces/book.interface";
import styled from "styled-components";
import {
	foregroundColor,
	titleTextColor,
	spacing,
	noteText,
	fontSize,
} from "../../constants/Theme";

interface Props extends Book {
	id: string | number;
	quotes: Quote[];
}

const CardTheme = styled(CardItem)`
	background-color: ${foregroundColor};
`;
const CardTitle = styled(H3)`
	color: ${titleTextColor};
	margin-bottom: ${spacing.s};
`;
const CardNote = styled(Text)`
	color: ${noteText};
	font-size: ${fontSize.m};
	margin-bottom: ${spacing.m};
`;
const CardItemTheme = styled(ListItem)`
	margin-bottom: -${spacing.s};
	margin-left: -${spacing.xs};
	background-color: transparent;
`;
const CardImg = styled(Image)`
	flex: 1;
	height: 130px;
	margin-right: ${spacing.l};
	max-width: 90px;
`;

const BookListItem: React.FC<Props> = ({
	id,
	cover,
	title,
	author,
	quotes,
}) => {
	const navigation = useNavigation();

	const navigateToBookDetails = () => {
		navigation.navigate("Book details", { id });
	};

	const bookCover = cover.length
		? { uri: cover }
		: require("../../assets/images/book-cover-placeholder.jpg");

	return (
		<CardItemTheme noIndent itemDivider>
			<CardTheme button onPress={() => navigateToBookDetails()}>
				<CardImg source={bookCover} />
				<View style={{ flex: 1 }}>
					<CardTitle>{title}</CardTitle>
					<CardNote>{author}</CardNote>
					<CardNote>Quotes: {quotes ? quotes.length : 0}</CardNote>
				</View>
			</CardTheme>
		</CardItemTheme>
	);
};

export default BookListItem;
