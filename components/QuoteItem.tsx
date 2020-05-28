import React from "react";
import { Body, Badge, Text } from "native-base";

import { View } from "react-native";
import { Quote } from "../interfaces/book.interface";
import styled from "styled-components";
import {
	fontFamily,
	titleTextColor,
	fontSize,
	foregroundColor,
	spacing,
	noteText,
	orange,
	brown,
} from "../constants/Theme";

interface Props {
	quote: Quote;
	author?: string;
	title?: string;
}

const QuoteText = styled(Text)`
	font-family: ${fontFamily.gotu};
	color: ${titleTextColor};
	font-size: ${fontSize.m};
`;
const AuthorText = styled(Text)`
	color: ${noteText};
	font-size: ${fontSize.sm};
	margin-top: ${spacing.s};
`;
const ContainerTheme = styled(Body)`
	background-color: ${foregroundColor};
`;
const CategoriesWrapper = styled(View)`
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: ${spacing.s};
`;
const CategoryBadge = styled(Badge)`
	background-color: ${orange[300]};
	margin-right: ${spacing.s};
	margin-top: ${spacing.xs};
`;
const CategoryText = styled(Text)`
	color: ${brown[900]};
	font-size: ${fontSize.sm};
`;

const QuoteItem: React.FC<Props> = ({ quote, author, title }) => {
	return (
		<ContainerTheme>
			<QuoteText>"{quote.quote}"</QuoteText>
			{author && title && (
				<AuthorText>
					{author}, {title}
				</AuthorText>
			)}
			<CategoriesWrapper>
				{quote.categories.map((category, index) => (
					<CategoryBadge key={index}>
						<CategoryText>{category}</CategoryText>
					</CategoryBadge>
				))}
			</CategoriesWrapper>
		</ContainerTheme>
	);
};

export default QuoteItem;
