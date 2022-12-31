import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setYear } from '../../../redux/slices/hubSlice';
import { setSchedule } from '../../../redux/slices/measurementsSlice';
import { setMLBTeam, getMLBStandings } from '../../../redux/slices/mlbSlice';
import {
	setNBATeam,
	getNBAStandings,
	getNBASchedule,
} from '../../../redux/slices/nbaSlice';
import {
	setNFLTeam,
	getNFLStandings,
	getNFLSchedule,
} from '../../../redux/slices/nflSlice';
import { setNHLTeam, getNHLStandings } from '../../../redux/slices/nhlSlice';
import { optionMap, nflRecordMap, recordMap } from '../../../util/helpers';
import FullScreen from '../../../components/FullScreen';
import Loading from '../../../components/Loading';
import Picker from '../../../components/Picker';
import Button from '../../../components/Button';
import GameBlock from '../components/GameBlock';

const ScheduleScreen = () => {
	const {
		sport,
		year,
		nflFav,
		nflFavKey,
		nbaFav,
		nbaFavKey,
		mlbFav,
		mlbFavKey,
		nhlFav,
		nhlFavKey,
	} = useSelector((state) => state.hub);
	const { schedule } = useSelector((state) => state.measure);
	const { mlbStandings, mlbTeams, mlbSchedule } = useSelector(
		(state) => state.mlb
	);
	const { nbaStandings, nbaTeams, nbaSchedule } = useSelector(
		(state) => state.nba
	);
	const { nflStandings, nflTeams, nflSchedule } = useSelector(
		(state) => state.nfl
	);
	const { nhlStandings, nhlTeams, nhlSchedule } = useSelector(
		(state) => state.nhl
	);
	const mlbLoading = useSelector((state) => state.mlb.loading);
	const nbaLoading = useSelector((state) => state.nba.loading);
	const nflLoading = useSelector((state) => state.nfl.loading);
	const nhlLoading = useSelector((state) => state.nhl.loading);
	const blockDimensions = {
		width: schedule && schedule.width - 40,
		height:
			schedule && schedule.height > 510
				? schedule.height * 0.9
				: schedule.height * 0.85,
	};
	const logoContainerSize = {
		width: schedule && schedule.height > 510 ? 80 : 65,
		height: schedule && schedule.height > 510 ? 80 : 65,
	};
	const logo = {
		width: schedule && schedule.height > 510 ? 75 : 60,
	};
	const scoreTxt = {
		fontSize: schedule && schedule.height > 510 ? 25 : 20,
		fontWeight: 'bold',
	};
	const centerTxt = {
		fontSize: schedule && schedule.height > 510 ? 50 : 30,
		fontWeight: 'bold',
	};
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();
	let loading;
	let background;
	let favTeam;
	let record;
	let teams;

	const handleSelect = (e) => {
		switch (sport) {
			case 'mlb':
				dispatch(setMLBTeam(e === null ? null : e.value));
				break;

			case 'nba':
				dispatch(setNBATeam(e === null ? null : e.value));
				break;

			case 'nfl':
				dispatch(setNFLTeam(e === null ? null : e.value));
				break;

			case 'nhl':
				dispatch(setNHLTeam(e === null ? null : e.value));

			default:
				break;
		}
	};

	const handlePress = () => {
		let scheduleData;
		switch (sport) {
			case 'nfl':
				dispatch(getNFLSchedule(year));
				break;

			case 'nba':
				scheduleData = { year, team };
				dispatch(getNBASchedule(scheduleData));
				break;

			case 'mlb':
				break;

			case 'nhl':
				break;

			default:
				break;
		}
	};

	if (mlbLoading || nbaLoading || nflLoading || nhlLoading) {
		loading = true;
	} else {
		loading = false;
	}

	switch (sport) {
		case 'mlb':
			background = require('../../../../assets/mlbBackground.jpg');
			if (mlbFav) favTeam = mlbFav;
			if (mlbFavKey) record = recordMap(mlbFavKey, mlbStandings);
			if (mlbTeams) teams = optionMap(mlbTeams);
			break;

		case 'nba':
			background = require('../../../../assets/nbaBackground.jpg');
			if (nbaFav) favTeam = nbaFav;
			if (nbaFavKey) record = recordMap(nbaFavKey, nbaStandings);
			if (nbaTeams) teams = optionMap(nbaTeams);
			break;

		case 'nfl':
			background = require('../../../../assets/nflBackground.jpg');
			if (nflFav) favTeam = nflFav;
			if (nflFavKey) record = nflRecordMap(nflFavKey, nflStandings);
			if (nflTeams) teams = optionMap(nflTeams);
			break;

		case 'nhl':
			background = require('../../../../assets/nhlBackground.jpg');
			if (nhlFav) favTeam = nhlFav;
			if (nhlFavKey) record = recordMap(nhlFavKey, nhlStandings);
			if (nhlTeams) teams = optionMap(nhlTeams);
			break;

		default:
			favTeam = 'Set Favorite Team';
			record = 'Set Favorite Team';
			break;
	}

	useEffect(() => {
		childRef.current.measureLayout(
			parentRef.current,
			(left, top, width, height) => {
				if (
					!schedule ||
					(schedule.width !== width && schedule.height !== height)
				) {
					dispatch(setSchedule({ left, top, width, height }));
				}
			}
		);
	}, [schedule]);

	useEffect(() => {
		if (sport === 'mlb' && !mlbStandings) {
			dispatch(getMLBStandings());
		} else if (sport === 'nba' && !nbaStandings) {
			dispatch(getNBAStandings());
		} else if (sport === 'nfl' && !nflStandings) {
			dispatch(getNFLStandings());
		} else if (sport === 'nhl' && !nhlStandings) {
			dispatch(getNHLStandings());
		}
	}, [mlbStandings, nbaStandings, nflStandings, nhlStandings]);

	return (
		<FullScreen img={background}>
			{loading && <Loading />}
			<View style={styles.canvas} ref={parentRef}>
				<View style={styles.header}>
					<Text style={styles.txt}>Fav Team: {favTeam}</Text>
					<Text style={styles.txt}>Current Record: {record}</Text>
				</View>
				<View style={styles.searchContainer}>
					<View style={styles.searchInputContainer}>
						<View style={styles.searchInput}>
							<Picker options={teams} onSelect={(e) => handleSelect(e)} />
						</View>
						<View style={styles.searchInput}>
							<TextInput
								style={styles.txtInput}
								placeholder='Year'
								placeholderTextColor='#94a1b2'
								onChangeText={(text) => dispatch(setYear(text))}
								keyboardType={'number-pad'}
								value={year}
							/>
						</View>
					</View>
					<Button
						btnStyle={styles.btn}
						btnTxt='Get Schedule'
						btnTxtStyle={styles.btnText}
						onPress={handlePress}
					/>
				</View>
				<View style={styles.listContainer} ref={childRef}>
					{teams ? (
						<FlatList
							data={teams}
							renderItem={({ item }) => (
								<GameBlock
									item={item}
									blockDimensions={blockDimensions}
									logoContainerSize={logoContainerSize}
									logo={logo}
									scoreTxt={scoreTxt}
									centerTxt={centerTxt}
								/>
							)}
							keyExtractor={(item) => item.GameKey}
							horizontal
							showsHorizontalScrollIndicator={false}
							initialNumToRender={5}
						/>
					) : (
						<Text>No Schedule</Text>
					)}
				</View>
			</View>
		</FullScreen>
	);
};

export default ScheduleScreen;

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		padding: 20,
	},
	header: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#242629e8',
		marginBottom: 10,
	},
	txt: {
		color: '#94a1b2',
	},
	searchContainer: {
		height: 100,
		backgroundColor: '#242629e8',
		justifyContent: 'space-evenly',
	},
	searchInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchInput: {
		width: '50%',
	},
	txtInput: {
		backgroundColor: 'rgba(0, 0, 0, 0.801)',
		color: 'whitesmoke',
		width: '90%',
		height: 30,
		borderRadius: 20,
		textAlign: 'center',
	},
	btn: {
		backgroundColor: 'dodgerblue',
		width: 150,
		alignSelf: 'center',
	},
	btnText: {
		fontWeight: 'bold',
	},
	listContainer: {
		flex: 1,
	},
});
