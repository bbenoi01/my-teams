import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const StandingsScreen = () => {
	return (
		<View style={styles.canvas}>
			<Text>StandingsScreen</Text>
		</View>
	);
};

export default StandingsScreen;

const styles = StyleSheet.create({
	canvas: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
