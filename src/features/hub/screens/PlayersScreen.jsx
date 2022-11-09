import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PlayersScreen = () => {
	return (
		<View style={styles.canvas}>
			<Text>PlayersScreen</Text>
		</View>
	);
};

export default PlayersScreen;

const styles = StyleSheet.create({
	canvas: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
