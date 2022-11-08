import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Surface } from 'react-native-paper';

const Quad = ({ onPress, background }) => {
	return (
		<TouchableOpacity style={styles.canvas} onPress={onPress}>
			<ImageBackground
				style={styles.img}
				source={background}
				resizeMode='cover'
			>
				<Surface style={styles.select}></Surface>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default Quad;

const styles = StyleSheet.create({
	canvas: {
		width: '50%',
		height: '50%',
	},
	img: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	select: {
		width: '80%',
		height: 15,
		borderRadius: 50,
	},
});
