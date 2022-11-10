import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { getNFLTeams } from '../../../redux/slices/nflSlice';
import { getNBATeams } from '../../../redux/slices/nbaSlice';
import { getMLBTeams } from '../../../redux/slices/mlbSlice';
import { getNHLTeams } from '../../../redux/slices/nhlSlice';
import {
	setSpread,
	setNFLFav,
	setNBAFav,
	setMLBFav,
	setNHLFav,
	setDimensions,
} from '../../../redux/slices/hubSlice';
import { optionMap } from '../../../util/helpers';
import Loading from '../../../components/Loading';
import Quad from '../components/Quad';
import Tab from '../components/Tab';

const HubScreen = ({ navigation }) => {
	const { spread, nflFav, nbaFav, mlbFav, nhlFav, dimensions } = useSelector(
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

	const tlSpread = {
		transform: dimensions && [
			{ translateX: -(dimensions.width / 1.7) },
			{ translateY: -(dimensions.height / 1.2) },
		],
	};

	const trSpread = {
		transform: dimensions && [
			{ translateX: dimensions.width / 1.7 },
			{ translateY: -(dimensions.height / 1.2) },
		],
	};

	const blSpread = {
		transform: dimensions && [
			{ translateX: -(dimensions.width / 1.7) },
			{ translateY: dimensions.height / 1.2 },
		],
	};

	const brSpread = {
		transform: dimensions && [
			{ translateX: dimensions.width / 1.7 },
			{ translateY: dimensions.height / 1.2 },
		],
	};

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
	}, [nflTeams, nbaTeams, mlbTeams, nhlTeams]);

	useEffect(() => {
		if (!dimensions || dimensions.width === 0) {
			childRef.current.measureLayout(
				parentRef.current,
				(left, top, width, height) => {
					dispatch(setDimensions({ left, top, width, height }));
				}
			);
		}
	}, [dimensions]);

	return (
		<View style={styles.canvas}>
			{loading && <Loading />}
			<Tab
				spread={spread}
				backgroud='green'
				spreadStyle={tlSpread}
				title='News'
				onPress={() => navigation.navigate('News')}
			/>
			<Tab
				spread={spread}
				backgroud='red'
				spreadStyle={trSpread}
				title='Stats'
				titlePlacement={{ alignItems: 'flex-end' }}
				onPress={() => navigation.navigate('Stats')}
			/>
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
			<Tab
				spread={spread}
				backgroud='dodgerblue'
				spreadStyle={blSpread}
				title='Players'
				titlePlacement={{ justifyContent: 'flex-end' }}
				onPress={() => navigation.navigate('Players')}
			/>
			<Tab
				spread={spread}
				backgroud='indigo'
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
