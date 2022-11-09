import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NewsScreen = () => {
	return (
		<View style={styles.canvas}>
			<Text>NewsScreen</Text>
		</View>
	);
};

export default NewsScreen;

const styles = StyleSheet.create({
	canvas: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
