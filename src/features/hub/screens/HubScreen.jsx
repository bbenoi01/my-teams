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
import Quad from '../components/Quad';

const HubScreen = ({ navigation }) => {
	const { spread, nflFav, nbaFav, mlbFav, nhlFav } = useSelector(
		(state) => state.hub
	);
	const dispatch = useDispatch();

	console.log('Spread', spread);

	return (
		<View style={styles.canvas}>
			<Surface style={spread ? [styles.tl, styles.tlSpread] : styles.tl}>
				<Text>News</Text>
			</Surface>
			<Surface style={spread ? [styles.tr, styles.trSpread] : styles.tr}>
				<Text>Stats</Text>
			</Surface>
			<Surface style={styles.surface}>
				<View style={styles.head}>
					<Text style={styles.headTxt}>Hub</Text>
				</View>
				<View style={styles.container}>
					<Quad
						onPress={() => dispatch(setSpread())}
						background={require('../../../../assets/nflBackground.jpg')}
					/>
					<Quad
						onPress={() => dispatch(setSpread())}
						background={require('../../../../assets/nbaBackground.jpg')}
					/>
					<Quad
						onPress={() => dispatch(setSpread())}
						background={require('../../../../assets/mlbBackground.jpg')}
					/>
					<Quad
						onPress={() => dispatch(setSpread())}
						background={require('../../../../assets/nhlBackground.jpg')}
					/>
				</View>
			</Surface>
			<Surface style={spread ? [styles.bl, styles.blSpread] : styles.bl}>
				<Text>Players</Text>
			</Surface>
			<Surface style={spread ? [styles.br, styles.brSpread] : styles.br}>
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
		backgroundColor: 'green',
	},
	tlSpread: {
		transform: [{ translateX: -96 }, { translateY: -300 }],
	},
	tr: {
		width: '50%',
		height: '25%',
		position: 'absolute',
		zIndex: 0,
		backgroundColor: 'red',
	},
	trSpread: {
		transform: [{ translateX: 96 }, { translateY: -300 }],
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
		backgroundColor: 'dodgerblue',
	},
	blSpread: {
		transform: [{ translateX: -96 }, { translateY: 300 }],
	},
	br: {
		width: '50%',
		height: '25%',
		position: 'absolute',
		zIndex: 0,
		backgroundColor: 'indigo',
	},
	brSpread: {
		transform: [{ translateX: 96 }, { translateY: 300 }],
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
});
