import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ResetButton = ({ background, btnTxt, onPress }) => {
	return (
		<TouchableOpacity
			style={[styles.canvas, { backgroundColor: background }]}
			onPress={onPress}
		>
			<Text style={styles.btnTxt}>{btnTxt}</Text>
		</TouchableOpacity>
	);
};

export default ResetButton;

const styles = StyleSheet.create({
	canvas: {
		width: 100,
		alignItems: 'center',
		borderRadius: 50,
		marginVertical: 10,
		padding: 10,
	},
	btnTxt: {
		color: 'whitesmoke',
	},
});
