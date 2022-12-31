import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
import {
	getNFLTeams,
	getNFLNews,
	getNFLFavTeamPlayers,
	getNFLTeamStats,
	getNFLStandings,
} from '../../../redux/slices/nflSlice';
import {
	getNBATeams,
	getNBANews,
	getNBAFavTeamPlayers,
	getNBATeamStats,
	getNBAStandings,
} from '../../../redux/slices/nbaSlice';
import {
	getMLBTeams,
	getMLBNews,
	getMLBFavTeamPlayers,
	getMLBTeamStats,
	getMLBStandings,
} from '../../../redux/slices/mlbSlice';
import {
	getNHLTeams,
	getNHLNews,
	getNHLFavTeamPlayers,
	getNHLTeamStats,
	getNHLStandings,
} from '../../../redux/slices/nhlSlice';
import {
	setSpread,
	setSport,
	setNFLFav,
	setNBAFav,
	setMLBFav,
	setNHLFav,
} from '../../../redux/slices/hubSlice';
import { setTab } from '../../../redux/slices/measurementsSlice';
import { optionMap } from '../../../util/helpers';
import Loading from '../../../components/Loading';
import Quad from '../components/Quad';
import Tab from '../components/Tab';

const HubScreen = ({ navigation }) => {
	const {
		spread,
		sport,
		nflFav,
		nflFavKey,
		nbaFav,
		nbaFavKey,
		mlbFav,
		mlbFavKey,
		nhlFav,
		nhlFavKey,
	} = useSelector((state) => state.hub);
	const hubLoading = useSelector((state) => state.hub.loading);
	const { tab } = useSelector((state) => state.measure);
	const { nflTeams, nflNews, nflPlayers, nflStats, nflStandings } = useSelector(
		(state) => state.nfl
	);
	const nflLoading = useSelector((state) => state.nfl.loading);
	const { nbaTeams, nbaNews, nbaPlayers, nbaStats, nbaStandings } = useSelector(
		(state) => state.nba
	);
	const nbaLoading = useSelector((state) => state.nba.loading);
	const { mlbTeams, mlbNews, mlbPlayers, mlbStats, mlbStandings } = useSelector(
		(state) => state.mlb
	);
	const mlbLoading = useSelector((state) => state.mlb.loading);
	const { nhlTeams, nhlNews, nhlPlayers, nhlStats, nhlStandings } = useSelector(
		(state) => state.nhl
	);
	const nhlLoading = useSelector((state) => state.nhl.loading);
	let parentRef = useRef(null);
	let childRef = useRef(null);
	const loading =
		hubLoading || nflLoading || nbaLoading || mlbLoading || nhlLoading;

	const dispatch = useDispatch();

	const handleQuadPress = (sport) => {
		switch (sport) {
			case 'nfl':
				!nflNews && dispatch(getNFLNews());
				!nflPlayers && dispatch(getNFLFavTeamPlayers(nflFavKey));
				!nflStats && dispatch(getNFLTeamStats(nflTeams));
				!nflStandings && dispatch(getNFLStandings(nflTeams));
				break;

			case 'nba':
				!nbaNews && dispatch(getNBANews());
				!nbaPlayers && dispatch(getNBAFavTeamPlayers(nbaFavKey));
				!nbaStats && dispatch(getNBATeamStats());
				!nbaStandings && dispatch(getNBAStandings());
				break;

			case 'mlb':
				!mlbNews && dispatch(getMLBNews());
				!mlbPlayers && dispatch(getMLBFavTeamPlayers(mlbFavKey));
				!mlbStats && dispatch(getMLBTeamStats());
				!mlbStandings && dispatch(getMLBStandings());
				break;

			case 'nhl':
				!nhlNews && dispatch(getNHLNews());
				!nhlPlayers && dispatch(getNHLFavTeamPlayers(nhlFavKey));
				!nhlStats && dispatch(getNHLTeamStats());
				!nhlStandings && dispatch(getNHLStandings());
				break;

			default:
				dispatch(setSpread());
				break;
		}
		if (spread) {
			dispatch(setSport(null));
		} else {
			dispatch(setSport(sport));
		}
		dispatch(setSpread());
	};

	const tlSpread = {
		transform: tab && [
			{ translateX: -(tab.width / 1.7) },
			{ translateY: -(tab.height / 1.2) },
		],
	};

	const trSpread = {
		transform: tab && [
			{ translateX: tab.width / 1.7 },
			{ translateY: -(tab.height / 1.2) },
		],
	};

	const blSpread = {
		transform: tab && [
			{ translateX: -(tab.width / 1.7) },
			{ translateY: tab.height / 1.2 },
		],
	};

	const brSpread = {
		transform: tab && [
			{ translateX: tab.width / 1.7 },
			{ translateY: tab.height / 1.2 },
		],
	};

	let nflTeamOptions = nflTeams && optionMap(nflTeams);

	let nbaTeamOptions = nbaTeams && optionMap(nbaTeams);

	let mlbTeamOptions = mlbTeams && optionMap(mlbTeams);

	let nhlTeamOptions = nhlTeams && optionMap(nhlTeams);

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
		childRef.current.measureLayout(
			parentRef.current,
			(left, top, width, height) => {
				if (!tab || (tab.width !== width && tab.height !== height)) {
					dispatch(setTab({ left, top, width, height }));
				}
			}
		);
	}, [nflTeams, nbaTeams, mlbTeams, nhlTeams, tab]);

	return (
		<View style={styles.canvas}>
			{loading && <Loading />}
			<Tab
				spread={spread}
				spreadStyle={tlSpread}
				title='News'
				onPress={() => navigation.navigate('News')}
			/>
			<Tab
				spread={spread}
				spreadStyle={trSpread}
				title='Stats'
				titlePlacement={{ alignItems: 'flex-end' }}
				onPress={() => navigation.navigate('Stats')}
			/>
			<Surface style={styles.surface}>
				<View style={spread ? [styles.head, styles.pop] : styles.head}>
					<Text style={styles.headTxt}>Hub</Text>
				</View>
				<View style={styles.container} ref={parentRef}>
					<View
						style={sport === 'nfl' ? [styles.quad, styles.active] : styles.quad}
						ref={childRef}
					>
						<Quad
							disabled={!nflFav || (spread && sport !== 'nfl')}
							onPress={() => handleQuadPress('nfl')}
							background={require('../../../../assets/nflBackground.jpg')}
							fav={nflFav}
							options={nflTeamOptions}
							onSelect={(e) => dispatch(setNFLFav(e === null ? null : e.value))}
						/>
					</View>
					<View
						style={sport === 'nba' ? [styles.quad, styles.active] : styles.quad}
					>
						<Quad
							disabled={!nbaFav || (spread && sport !== 'nba')}
							onPress={() => handleQuadPress('nba')}
							background={require('../../../../assets/nbaBackground.jpg')}
							fav={nbaFav}
							options={nbaTeamOptions}
							onSelect={(e) => dispatch(setNBAFav(e === null ? null : e.value))}
						/>
					</View>
					<View
						style={sport === 'mlb' ? [styles.quad, styles.active] : styles.quad}
					>
						<Quad
							disabled={!mlbFav || (spread && sport !== 'mlb')}
							onPress={() => handleQuadPress('mlb')}
							background={require('../../../../assets/mlbBackground.jpg')}
							fav={mlbFav}
							options={mlbTeamOptions}
							onSelect={(e) => dispatch(setMLBFav(e === null ? null : e.value))}
						/>
					</View>
					<View
						style={sport === 'nhl' ? [styles.quad, styles.active] : styles.quad}
					>
						<Quad
							disabled={!nhlFav || (spread && sport !== 'nhl')}
							onPress={() => handleQuadPress('nhl')}
							background={require('../../../../assets/nhlBackground.jpg')}
							fav={nhlFav}
							options={nhlTeamOptions}
							onSelect={(e) => dispatch(setNHLFav(e === null ? null : e.value))}
						/>
					</View>
				</View>
			</Surface>
			<Tab
				spread={spread}
				spreadStyle={blSpread}
				title='Players'
				titlePlacement={{ justifyContent: 'flex-end' }}
				onPress={() => navigation.navigate('Players')}
			/>
			<Tab
				spread={spread}
				spreadStyle={brSpread}
				title='Standings'
				titlePlacement={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
				onPress={() => navigation.navigate('Standings')}
			/>
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
	surface: {
		width: '100%',
		height: '50%',
		position: 'absolute',
		zIndex: 1,
	},
	head: {
		width: '100%',
		height: '10%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#16161A',
		color: '#94a1b2',
	},
	pop: {
		borderWidth: 1,
		borderColor: '#94a1b2',
		// borderTopWidth: 1,
		// borderTopColor: '#94a1b2',
		// borderRightWidth: 1,
		// borderRightColor: '#94a1b2',
		// borderLeftWidth: 1,
		// borderLeftColor: '#94a1b2',
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
	active: {
		borderWidth: 2,
		borderColor: 'red',
		elevation: 20,
	},
});
