import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';

const Tab = ({ spread, spreadStyle, title, titlePlacement, onPress }) => {
	return (
		<TouchableOpacity
			style={spread ? [styles.canvas, spreadStyle] : styles.canvas}
			onPress={onPress}
		>
			<Surface style={[styles.surface, { ...titlePlacement }]}>
				<Text style={styles.tabTxt}>{title}</Text>
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
		padding: 10,
		backgroundColor: '#16161A',
		borderWidth: 1,
		borderColor: '#94a1b2',
	},
	tabTxt: {
		color: '#94a1b2',
	},
});
