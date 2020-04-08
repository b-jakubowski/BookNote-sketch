import React, {useState, useEffect} from "react";
import {View, StyleSheet, ActivityIndicator} from "react-native";
import {Container, Text} from "native-base";

export default function DailyQuoteScreen() {
	const [quote, setQuote] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch("https://api.quotable.io/random")
			.then((res) => res.json())
			.then((res) => {
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
}

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
