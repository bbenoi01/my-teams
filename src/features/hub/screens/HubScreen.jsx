import { useDispatch, useSelector } from 'react-redux';
import {
	Animated,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Surface } from 'react-native-paper';
import { setSpread } from '../../../redux/slices/hubSlice';

const HubScreen = ({ navigation }) => {
	const { spread } = useSelector((state) => state.hub);
	const dispatch = useDispatch();

	console.log('Spread', spread);

	return (
		<View style={styles.canvas}>
			<Surface style={styles.tl}>
				<Text>News</Text>
			</Surface>
			<Surface style={styles.tr}>
				<Text>News</Text>
			</Surface>
			<Surface style={styles.surface}>
				<View style={styles.head}>
					<Text style={styles.headTxt}>Hub</Text>
				</View>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.quad}
						onPress={() => dispatch(setSpread())}
					>
						<ImageBackground
							style={styles.img}
							source={require('../../../../assets/nflBackground.jpg')}
							resizeMode='cover'
						>
							<Surface style={styles.select}></Surface>
						</ImageBackground>
					</TouchableOpacity>
					<TouchableOpacity style={styles.quad}>
						<ImageBackground
							style={styles.img}
							source={require('../../../../assets/nbaBackground.jpg')}
							resizeMode='cover'
						>
							<Surface style={styles.select}></Surface>
						</ImageBackground>
					</TouchableOpacity>
					<TouchableOpacity style={styles.quad}>
						<ImageBackground
							style={styles.img}
							source={require('../../../../assets/mlbBackground.jpg')}
							resizeMode='cover'
						>
							<Surface style={styles.select}></Surface>
						</ImageBackground>
					</TouchableOpacity>
					<TouchableOpacity style={styles.quad}>
						<ImageBackground
							style={styles.img}
							source={require('../../../../assets/nhlBackground.jpg')}
							resizeMode='cover'
						>
							<Surface style={styles.select}></Surface>
						</ImageBackground>
					</TouchableOpacity>
				</View>
			</Surface>
			<Surface style={styles.bl}>
				<Text>Players</Text>
			</Surface>
			<Surface style={styles.br}>
				<Text>Standings</Text>
			</Surface>
			{/* <Text>HubScreen</Text>
			<TouchableOpacity
				style={styles.btn}
				onPress={() => navigation.navigate('Sports')}
			>
				<Text>Submit</Text>
			</TouchableOpacity> */}
		</View>
	);
};

export default HubScreen;

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#242629',
		padding: 20,
		position: 'relative',
	},
	spread: {},
	// btn: {
	// 	borderWidth: 1,
	// 	borderRadius: 7,
	// 	marginVertical: 10,
	// 	padding: 5,
	// },
	tl: {
		width: '50%',
		height: '25%',
		position: 'absolute',
		zIndex: 0,
	},
	tlSpread: {
		width: '50%',
		height: '25%',
		// transform: [{ translateY: 100 }],
	},
	tr: {
		width: '50%',
		height: '25%',
		position: 'absolute',
		zIndex: 0,
	},
	trSpread: {
		// transform: translate('56%', '-56%'),
	},
	surface: {
		width: '100%',
		height: '50%',
		position: 'absolute',
		zIndex: 1,
	},
	bl: {
		width: '50%',
		height: '25%',
		position: 'absolute',
		zIndex: 0,
	},
	blSpread: {
		// transform: translate('-56%', '56%'),
	},
	br: {
		width: '50%',
		height: '25%',
		position: 'absolute',
		zIndex: 0,
	},
	brSpread: {
		// transform: translate('56%', '56%'),
	},
	head: {
		width: '100%',
		height: '10%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#16161A',
		color: '#94a1b2',
	},
	headTxt: {
		color: '#94a1b2',
		fontWeight: 'bold',
	},
	container: {
		width: '100%',
		height: '90%',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	quad: {
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
