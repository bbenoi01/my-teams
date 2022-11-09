import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';
import { Surface } from 'react-native-paper';
import Picker from '../../../components/Picker';

const Quad = ({
	onPress,
	background,
	fav,
	disabled,
	placeholderText,
	options,
	defaultOption,
	onSelect,
	clearable,
}) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={styles.canvas}
			onPress={onPress}
		>
			<ImageBackground
				style={styles.img}
				source={background}
				resizeMode='cover'
			>
				{fav ? (
					<Surface style={styles.surface}>
						<Text style={styles.favTxt}>{fav}</Text>
					</Surface>
				) : (
					<Picker
						placeholderText={placeholderText}
						options={options}
						defaultOption={defaultOption}
						onSelect={onSelect}
						clearable={clearable}
					/>
				)}
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default Quad;

const styles = StyleSheet.create({
	canvas: {
		// width: '50%',
		// height: '50%',
		width: '100%',
		height: '100%',
	},
	img: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	surface: {
		width: '90%',
		height: 30,
		alignSelf: 'center',
		borderRadius: 20,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
	},
	favTxt: {
		color: '#94a1b2',
	},
});
