import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { persistor } from '../../../redux/rootStore';
import { clearHubSlice } from '../../../redux/slices/hubSlice';
import { clearNFLSlice } from '../../../redux/slices/nflSlice';
import { clearNBASlice } from '../../../redux/slices/nbaSlice';
import { clearMLBSlice } from '../../../redux/slices/mlbSlice';
import { clearNHLSlice } from '../../../redux/slices/nhlSlice';
import ResetButton from '../components/ResetButton';

const SettingsScreen = () => {
	const dispatch = useDispatch();

	const resetAll = () => {
		persistor.purge();
	};

	const resetSport = (sport) => {
		switch (sport) {
			case 'favs':
				dispatch(clearHubSlice());
				break;

			case 'nfl':
				dispatch(clearNFLSlice());
				break;

			case 'nba':
				dispatch(clearNBASlice());
				break;

			case 'mlb':
				dispatch(clearMLBSlice());
				break;

			case 'nhl':
				dispatch(clearNHLSlice());
				break;

			default:
				break;
		}
	};

	return (
		<View style={styles.canvas}>
			<ResetButton background='red' btnTxt='Reset All' onPress={resetAll} />
			<ResetButton
				background={'red'}
				btnTxt='Reset Favs'
				onPress={() => resetSport('favs')}
			/>
			<ResetButton
				background={'red'}
				btnTxt='Reset NFL'
				onPress={() => resetSport('nfl')}
			/>
			<ResetButton
				background={'red'}
				btnTxt='Reset NBA'
				onPress={() => resetSport('nba')}
			/>
			<ResetButton
				background={'red'}
				btnTxt='Reset MLB'
				onPress={() => resetSport('mlb')}
			/>
			<ResetButton
				background={'red'}
				btnTxt='Reset NHL'
				onPress={() => resetSport('nhl')}
			/>
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnTxt: {
		color: 'whitesmoke',
	},
	all: {
		backgroundColor: 'red',
		borderRadius: 50,
		position: 'absolute',
		top: 30,
		padding: 10,
	},
});
