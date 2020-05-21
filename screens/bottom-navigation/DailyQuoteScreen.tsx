import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Container, Text } from "native-base";

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
		<Container>
			<View style={styles.fillSpace}></View>
			<View style={styles.quoteContainer}>
				{loading ? (
					<ActivityIndicator size="large" />
				) : (
					<>
						<Text style={styles.quote}>"{quote.content}"</Text>
						<Text note style={styles.author}>
							{quote.author}
						</Text>
					</>
				)}
			</View>
			<View style={styles.fillSpace}></View>
		</Container>
	);
};

const styles = StyleSheet.create({
	author: {
		fontSize: 15,
	},
	fillSpace: {
		flex: 1,
	},
	quote: {
		fontSize: 20,
		marginBottom: 10,
	},
	quoteContainer: {
		flex: 1,
		padding: 20,
	},
});

export default DailyQuoteScreen;
