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
	getNFLSchedule,
} from '../../../redux/slices/nflSlice';
import { optionMap } from '../../../util/helpers';
import MapView from 'react-native-maps';
import dayjs from 'dayjs';
import FullScreen from '../../../components/FullScreen';
import Picker from '../../../components/Picker';

const FootballMainScreen = () => {
	const { sport } = useSelector((state) => state.hub);
	const { schedule } = useSelector((state) => state.measure);
	const { nflTeams, nflTeam, year, nflSchedule } = useSelector(
		(state) => state.nfl
	);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();
	let data = true;

	const blockDimensions = {
		width: schedule && schedule.width - 40,
		height: schedule && schedule.height - 30,
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
	}, [schedule]);

	return (
		<FullScreen img={require('../../../../assets/nflBackground.jpg')}>
			<View style={styles.canvas} ref={parentRef}>
				<View style={styles.header}>
					<Text style={styles.txt}>Fav Team: Raiders</Text>
					<Text style={styles.txt}>Current Record: 2-6-0</Text>
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
					{data ? (
						<FlatList
							data={nflSchedule}
							renderItem={({ item }) =>
								item.AwayTeam === 'BYE' ? (
									<View
										style={[
											styles.test,
											blockDimensions,
											{
												borderWidth: 1,
												borderColor: 'white',
												justifyContent: 'center',
												alignItems: 'center',
											},
										]}
									>
										<View style={styles.week}>
											<Text style={{ color: 'whitesmoke' }}>
												Week: {item.Week}
											</Text>
										</View>
										<Text style={styles.txt}>BYE Week</Text>
									</View>
								) : (
									<View
										style={[
											styles.test,
											blockDimensions,
											{ borderWidth: 1, borderColor: 'white' },
										]}
									>
										<View style={styles.week}>
											<Text style={{ color: 'whitesmoke' }}>
												Week: {item.Week}
											</Text>
										</View>
										<View style={styles.date}>
											<Text style={styles.txt}>
												Date: {dayjs(item.Date).format('MM/D/YYYY')}
											</Text>
										</View>
										<View style={styles.scoreContainer}>
											<View style={styles.homeScore}>
												<Text style={styles.txt}>{item.HomeTeam}</Text>
												<Text style={styles.txt}>{item.HomeScore}</Text>
											</View>
											<View style={styles.awayScore}>
												<Text style={styles.txt}>{item.AwayTeam}</Text>
												<Text style={styles.txt}>{item.AwayScore}</Text>
											</View>
										</View>
										<View style={styles.forcastContainer}>
											<Text style={styles.txt}>
												Forecast: {item.ForecastDescription}
											</Text>
										</View>
										<MapView
											style={styles.mapContainer}
											region={{
												latitude: item.StadiumDetails.GeoLat,
												longitude: item.StadiumDetails.GeoLong,
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
								)
							}
							keyExtractor={(item) => item.GameKey}
							horizontal
						/>
					) : (
						// <>
						// <View
						// 	style={[
						// 		styles.test,
						// 		blockDimensions,
						// 		{ borderWidth: 1, borderColor: 'white' },
						// 	]}
						// >
						// 	<Text style={{ color: 'whitesmoke' }}>Flat List</Text>
						// </View>
						// </>
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
		// justifyContent: 'center',
		// alignContent: 'center',
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
		borderWidth: 2,
		borderColor: 'rebeccapurple',
	},

	test: {
		backgroundColor: 'indigo',
		marginVertical: 10,
		marginHorizontal: 15,
		// justifyContent: 'center',
		// alignItems: 'center',
	},

	week: {
		padding: 10,
		alignItems: 'center',
		borderBottomWidth: 2,
		borderColor: 'whitesmoke',
	},

	date: {
		padding: 10,
		alignItems: 'center',
	},

	scoreContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},

	homeScore: {
		height: 50,
		borderWidth: 1,
	},

	awayScore: {
		height: 50,
		borderWidth: 1,
	},

	forcastContainer: {
		padding: 10,
		alignItems: 'center',
	},

	mapContainer: {
		flex: 1,
	},
});
