import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const StatsScreen = () => {
	return (
		<View style={styles.canvas}>
			<Text>StatsScreen</Text>
		</View>
	);
};

export default StatsScreen;

const styles = StyleSheet.create({
	canvas: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
