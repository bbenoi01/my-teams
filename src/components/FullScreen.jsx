import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FullScreen = ({ img, children }) => {
	return (
		<View style={styles.canvas}>
			<ImageBackground style={styles.img} source={img} resizeMode='cover'>
				{children}
			</ImageBackground>
		</View>
	);
};

export default FullScreen;

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
	},
	img: {
		height: '100%',
		width: '100%',
	},
});
