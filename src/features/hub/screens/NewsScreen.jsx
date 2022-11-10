import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NewsScreen = () => {
	return (
		<View style={styles.canvas}>
			<Text style={styles.txt}>News</Text>
		</View>
	);
};

export default NewsScreen;

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#242629',
		padding: 20,
	},
	txt: {
		color: '#94a1b2',
	},
});
