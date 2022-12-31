import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SportScreen = () => {
	return (
		<View style={styles.canvas}>
			<Text>SportScreen</Text>
		</View>
	);
};

export default SportScreen;

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#242629',
		padding: 20,
		position: 'relative',
	},
});
