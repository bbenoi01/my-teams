import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ disabled, btnStyle, btnTxt, btnTxtStyle, onPress }) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={[styles.btn, btnStyle]}
			onPress={onPress}
		>
			<Text style={[styles.btnTxt, btnTxtStyle]}>{btnTxt}</Text>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	btn: {
		padding: 5,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
	},
	btnTxt: {
		color: 'whitesmoke',
	},
});
