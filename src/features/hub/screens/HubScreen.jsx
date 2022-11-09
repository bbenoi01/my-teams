import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactNative, {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Surface } from 'react-native-paper';
import { getNFLTeams, clearNFLSlice } from '../../../redux/slices/nflSlice';
import { getNBATeams, clearNBASlice } from '../../../redux/slices/nbaSlice';
import { getMLBTeams, clearMLBSlice } from '../../../redux/slices/mlbSlice';
import { getNHLTeams, clearNHLSlice } from '../../../redux/slices/nhlSlice';
import {
	setSpread,
	setNFLFav,
	setNBAFav,
	setMLBFav,
	setNHLFav,
	setMeasure,
	clearHubSlice,
} from '../../../redux/slices/hubSlice';
import { optionMap } from '../../../util/helpers';
import Loading from '../../../components/Loading';
import Quad from '../components/Quad';

const HubScreen = ({ navigation }) => {
	const { spread, nflFav, nbaFav, mlbFav, nhlFav, measure } = useSelector(
		(state) => state.hub
	);
	const hubLoading = useSelector((state) => state.hub.loading);
	const { nflTeams } = useSelector((state) => state.nfl);
	const nflLoading = useSelector((state) => state.nfl.loading);
	const { nbaTeams } = useSelector((state) => state.nba);
	const nbaLoading = useSelector((state) => state.nba.loading);
	const { mlbTeams } = useSelector((state) => state.mlb);
	const mlbLoading = useSelector((state) => state.mlb.loading);
	const { nhlTeams } = useSelector((state) => state.nhl);
	const nhlLoading = useSelector((state) => state.nhl.loading);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const loading =
		hubLoading || nflLoading || nbaLoading || mlbLoading || nhlLoading;

	const dispatch = useDispatch();

	const getDimensions = () => {};

	let nflTeamOptions = [];
	if (nflTeams) {
		optionMap(nflTeams, nflTeamOptions);
	}

	let nbaTeamOptions = [];
	if (nbaTeams) {
		optionMap(nbaTeams, nbaTeamOptions);
	}

	let mlbTeamOptions = [];
	if (mlbTeams) {
		optionMap(mlbTeams, mlbTeamOptions);
	}

	let nhlTeamOptions = [];
	if (nhlTeams) {
		optionMap(nhlTeams, nhlTeamOptions);
	}

	const reset = () => {
		dispatch(clearHubSlice());
		dispatch(clearNFLSlice());
		dispatch(clearNBASlice());
		dispatch(clearMLBSlice());
		dispatch(clearNHLSlice());
	};

	useEffect(() => {
		if (!nflTeams) {
			dispatch(getNFLTeams());
		}
		if (!nbaTeams) {
			dispatch(getNBATeams());
		}
		if (!mlbTeams) {
			dispatch(getMLBTeams());
		}
		if (!nhlTeams) {
			dispatch(getNHLTeams());
		}
		if (childRef.current && parentRef.current) {
			childRef.current.measureLayout(parentRef.current, (width, height) => {
				dispatch(setMeasure({ width, height }));
			});
		}
	}, [nflTeams, nbaTeams, mlbTeams, nhlTeams, measure]);

	return (
		<View style={styles.canvas}>
			{loading && <Loading />}
			<Animated.View style={spread ? [styles.tl, styles.tlSpread] : styles.tl}>
				<Text>News</Text>
			</Animated.View>
			<Animated.View>
				<Surface style={spread ? [styles.tr, styles.trSpread] : styles.tr}>
					<Text>Stats</Text>
				</Surface>
			</Animated.View>
			<TouchableOpacity
				style={{
					backgroundColor: 'red',
					borderRadius: 50,
					position: 'absolute',
					top: 30,
					padding: 10,
				}}
				onPress={reset}
			>
				<Text style={{ color: 'whitesmoke' }}>Reset</Text>
			</TouchableOpacity>
			<Surface style={styles.surface}>
				<View style={styles.head}>
					<Text style={styles.headTxt}>Hub</Text>
				</View>
				<View style={styles.container} ref={parentRef}>
					<View style={styles.quad} ref={childRef}>
						<Quad
							disabled={!nflFav}
							onPress={() => dispatch(setSpread())}
							background={require('../../../../assets/nflBackground.jpg')}
							fav={nflFav}
							options={nflTeamOptions}
							onSelect={(e) => dispatch(setNFLFav(e === null ? null : e.value))}
						/>
					</View>
					<View style={styles.quad}>
						<Quad
							disabled={!nbaFav}
							onPress={() => dispatch(setSpread())}
							background={require('../../../../assets/nbaBackground.jpg')}
							fav={nbaFav}
							options={nbaTeamOptions}
							onSelect={(e) => dispatch(setNBAFav(e === null ? null : e.value))}
						/>
					</View>
					<View style={styles.quad}>
						<Quad
							disabled={!mlbFav}
							onPress={() => dispatch(setSpread())}
							background={require('../../../../assets/mlbBackground.jpg')}
							fav={mlbFav}
							options={mlbTeamOptions}
							onSelect={(e) => dispatch(setMLBFav(e === null ? null : e.value))}
						/>
					</View>
					<View style={styles.quad}>
						<Quad
							disabled={!nhlFav}
							onPress={() => dispatch(setSpread())}
							background={require('../../../../assets/nhlBackground.jpg')}
							fav={nhlFav}
							options={nhlTeamOptions}
							onSelect={(e) => dispatch(setNHLFav(e === null ? null : e.value))}
						/>
					</View>
				</View>
			</Surface>
			<Animated.View>
				<Surface style={spread ? [styles.bl, styles.blSpread] : styles.bl}>
					<Text>Players</Text>
				</Surface>
			</Animated.View>
			<Animated.View>
				<Surface style={spread ? [styles.br, styles.brSpread] : styles.br}>
					<Text>Standings</Text>
				</Surface>
			</Animated.View>
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
	quad: {
		width: '50%',
		height: '50%',
	},
});
