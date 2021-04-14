import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text, H3 } from "native-base";
import styled from "styled-components";
import {
	titleTextColor,
	spacing,
	fontSize,
	noteText,
} from "../../constants/Theme";

const ContainerTheme = styled(View)`
	flex: 1;
	padding: ${spacing.m};
	justify-content: center;
`;
const Quote = styled(H3)`
	color: ${titleTextColor};
	margin-bottom: ${spacing.m};
`;
const Author = styled(Text)`
	font-size: ${fontSize.m};
	color: ${noteText};
`;

interface RandomQuote {
	content: string;
	author: string;
}

const DailyQuoteScreen: React.FC = () => {
	const [quote, setQuote] = useState<RandomQuote>({ content: "", author: "" });
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);

		fetch("https://api.quotable.io/random")
			.then((res) => res.json())
			.then((res: RandomQuote) => {
				setQuote(res);
				setLoading(false);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<ContainerTheme>
			{loading ? (
				<ActivityIndicator size="large" />
			) : (
				<>
					<Quote>"{quote.content}"</Quote>
					<Author>{quote.author}</Author>
				</>
			)}
		</ContainerTheme>
	);
};

export default DailyQuoteScreen;
