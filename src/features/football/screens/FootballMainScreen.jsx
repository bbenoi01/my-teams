import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { setSchedule } from '../../../redux/slices/measurementsSlice';
import {
	setYear,
	setNFLTeam,
	getNFLStandings,
	getNFLSchedule,
} from '../../../redux/slices/nflSlice';
import { optionMap, nameMap, recordMap, byeMap } from '../../../util/helpers';
import MapView from 'react-native-maps';
import dayjs from 'dayjs';
import FullScreen from '../../../components/FullScreen';
import Picker from '../../../components/Picker';

const FootballMainScreen = () => {
	const { nflFav, nflFavKey } = useSelector((state) => state.hub);
	const { schedule } = useSelector((state) => state.measure);
	const { nflStandings, nflTeams, nflTeam, year, nflSchedule } = useSelector(
		(state) => state.nfl
	);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();

	const blockDimensions = {
		width: schedule && schedule.width - 40,
		height: schedule && schedule.height * 0.9,
	};

	let nflTeamOptions = [];
	if (nflTeams) {
		optionMap(nflTeams, nflTeamOptions);
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
		if (!nflStandings) {
			dispatch(getNFLStandings());
		}
	}, [schedule, nflStandings]);

	return (
		<FullScreen img={require('../../../../assets/nflBackground.jpg')}>
			<View style={styles.canvas} ref={parentRef}>
				<View style={styles.header}>
					<Text style={styles.txt}>Fav Team: {nflFav && nflFav}</Text>
					<Text style={styles.txt}>
						Current Record: {nflFavKey && recordMap(nflFavKey, nflStandings)}
					</Text>
				</View>
				<View style={styles.searchContainer}>
					<View style={styles.searchInputContainer}>
						<View style={styles.searchInput}>
							<Picker
								options={nflTeamOptions}
								onSelect={(e) =>
									dispatch(setNFLTeam(e === null ? null : e.value))
								}
							/>
						</View>
						<View style={styles.searchInput}>
							<TextInput
								placeholder='Year'
								onChangeText={(text) => dispatch(setYear(text))}
								keyboardType={'number-pad'}
							/>
						</View>
					</View>
					<Button
						title='Get Schedule'
						onPress={() => dispatch(getNFLSchedule(year))}
					/>
				</View>
				<View style={styles.listContainer} ref={childRef}>
					{nflSchedule ? (
						<FlatList
							data={nflSchedule}
							renderItem={({ item }) => (
								<View style={[styles.block, blockDimensions]}>
									<View style={styles.weekContainer}>
										<Text style={[styles.txt, styles.blockTxt]}>
											Week: {item.Week}
										</Text>
									</View>
									<View style={styles.dateContainer}>
										<Text style={[styles.txt, styles.blockTxt]}>
											{item.AwayTeam === 'BYE'
												? 'BYE WEEK'
												: `Date: ${dayjs(item.Date).format('M/D/YYYY')}`}
										</Text>
									</View>
									<View style={styles.scoreContainer}>
										{item.AwayTeam !== 'BYE' && (
											<>
												<View style={styles.score}>
													<Text style={[styles.txt, styles.scoreTxt]}>
														Away:
													</Text>
													<Text style={[styles.txt, styles.scoreTxt]}>
														{item.AwayScore ? item.AwayScore : 'TBD'}
													</Text>
													<Text style={[styles.txt, styles.scoreTxt]}>
														{nameMap(item.AwayTeam, nflTeams)}
													</Text>
												</View>
												<View style={styles.centerContainer}>
													<Text style={[styles.txt, styles.centerTxt]}>@</Text>
												</View>
												<View style={styles.score}>
													<Text style={[styles.txt, styles.scoreTxt]}>
														Home:
													</Text>
													<Text style={[styles.txt, styles.scoreTxt]}>
														{item.HomeScore ? item.HomeScore : 'TBD'}
													</Text>
													<Text style={[styles.txt, styles.scoreTxt]}>
														{nameMap(item.HomeTeam, nflTeams)}
													</Text>
												</View>
											</>
										)}
									</View>
									<View style={styles.forcastContainer}>
										<Text style={[styles.txt, styles.blockTxt]}>
											Forecast:{' '}
											{item.ForecastDescription
												? item.ForecastDescription
												: 'TBA'}
										</Text>
									</View>
									<MapView
										style={styles.mapContainer}
										region={{
											latitude:
												item.AwayTeam === 'BYE'
													? byeMap(item.HomeTeam, nflTeams).latitude
													: item.StadiumDetails.GeoLat,
											longitude:
												item.AwayTeam === 'BYE'
													? byeMap(item.HomeTeam, nflTeams).longitude
													: item.StadiumDetails.GeoLong,
											latitudeDelta: 0.004757,
											longitudeDelta: 0.006866,
										}}
										provider='google'
										mapType='satellite'
										rotateEnabled={false}
										scrollEnabled={false}
										pitchEnabled={false}
									></MapView>
								</View>
							)}
							keyExtractor={(item) => item.GameKey}
							horizontal
							showsHorizontalScrollIndicator={false}
						/>
					) : (
						<Text>No Schedule</Text>
					)}
				</View>
			</View>
		</FullScreen>
	);
};

export default FootballMainScreen;

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
		justifyContent: 'center',
	},
	searchInputContainer: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	searchInput: {
		width: '50%',
	},
	listContainer: {
		flex: 1,
		// padding: 10,
		// borderWidth: 1,
		// borderColor: 'indigo',
	},

	block: {
		alignSelf: 'center',
		backgroundColor: '#242629e8',
		marginVertical: 2.5,
		marginHorizontal: 15,
		borderWidth: 1,
		borderColor: '#94a1b2',
	},

	blockTxt: {
		fontWeight: 'bold',
	},

	weekContainer: {
		padding: 5,
		alignItems: 'center',
		borderBottomWidth: 2,
		borderBottomColor: 'rgb(148,161,178)',
	},

	dateContainer: {
		// padding: 5,
		// justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 5,
		// borderWidth: 1,
		// borderColor: 'green',
	},

	scoreContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 5,
	},

	score: {
		flex: 5,
		height: 75,
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	scoreTxt: {
		fontSize: 16,
		fontWeight: 'bold',
	},

	centerContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},

	centerTxt: {
		fontSize: 25,
		fontWeight: 'bold',
	},

	forcastContainer: {
		padding: 5,
		alignItems: 'center',
		marginVertical: 5,
		borderTopWidth: 2,
		borderTopColor: 'rgb(148,161,178)',
	},

	mapContainer: {
		flex: 1,
		// marginTop: 5,
	},
});
