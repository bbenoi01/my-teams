import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';

const Tab = ({
	spread,
	backgroud,
	spreadStyle,
	title,
	titlePlacement,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={spread ? [styles.canvas, spreadStyle] : styles.canvas}
			onPress={onPress}
		>
			<Surface
				style={[
					styles.surface,
					{ backgroundColor: backgroud, ...titlePlacement },
				]}
			>
				<Text>{title}</Text>
			</Surface>
		</TouchableOpacity>
	);
};

export default Tab;

const styles = StyleSheet.create({
	canvas: {
		width: '50%',
		height: '25%',
		position: 'absolute',
		zIndex: 0,
	},
	surface: {
		width: '100%',
		height: '100%',
	},
});
