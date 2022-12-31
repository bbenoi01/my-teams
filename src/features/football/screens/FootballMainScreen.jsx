import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Image,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { setYear } from '../../../redux/slices/hubSlice';
import { setSchedule } from '../../../redux/slices/measurementsSlice';
import {
	setNFLTeam,
	getNFLStandings,
	getNFLSchedule,
} from '../../../redux/slices/nflSlice';
import {
	optionMap,
	logoMap,
	nflRecordMap,
	byeMap,
} from '../../../util/helpers';
import { nflLogos } from '../../../data';
import MapView from 'react-native-maps';
import dayjs from 'dayjs';
import FullScreen from '../../../components/FullScreen';
import Loading from '../../../components/Loading';
import Picker from '../../../components/Picker';
import Button from '../../../components/Button';

const FootballMainScreen = () => {
	const { nflFav, nflFavKey } = useSelector((state) => state.hub);
	const { schedule } = useSelector((state) => state.measure);
	const { loading, nflStandings, nflTeams, nflTeam, year, nflSchedule } =
		useSelector((state) => state.nfl);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();

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

	const teams = nflTeams && optionMap(nflTeams);

	const handlePress = () => {
		dispatch(getNFLSchedule(year));
		dispatch(setYear(''));
	};

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
		if (!nflStandings) {
			dispatch(getNFLStandings());
		}
	}, [nflStandings]);

	return (
		<FullScreen img={require('../../../../assets/nflBackground.jpg')}>
			{loading && <Loading />}
			<View style={styles.canvas} ref={parentRef}>
				<View style={styles.header}>
					<Text style={styles.txt}>Fav Team: {nflFav && nflFav}</Text>
					<Text style={styles.txt}>
						Current Record: {nflFavKey && nflRecordMap(nflFavKey, nflStandings)}
					</Text>
				</View>
				<View style={styles.searchContainer}>
					<View style={styles.searchInputContainer}>
						<View style={styles.searchInput}>
							<Picker
								options={teams}
								onSelect={(e) =>
									dispatch(setNFLTeam(e === null ? null : e.value))
								}
							/>
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
													<View
														style={[styles.logoContainer, logoContainerSize]}
													>
														<Image
															style={logo}
															resizeMethod='scale'
															resizeMode='contain'
															source={logoMap(item.AwayTeam, nflLogos)}
														/>
													</View>
													<Text style={[styles.txt, scoreTxt]}>
														{item.AwayScore ? item.AwayScore : 'TBD'}
													</Text>
												</View>
												<View style={styles.centerContainer}>
													<Text style={[styles.txt, centerTxt]}>@</Text>
												</View>
												<View style={styles.score}>
													<View
														style={[styles.logoContainer, logoContainerSize]}
													>
														<Image
															style={logo}
															resizeMethod='scale'
															resizeMode='contain'
															source={logoMap(item.HomeTeam, nflLogos)}
														/>
													</View>
													<Text style={[styles.txt, scoreTxt]}>
														{item.HomeScore ? item.HomeScore : 'TBD'}
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
		alignItems: 'center',
		marginVertical: 5,
	},
	scoreContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 5,
	},
	score: {
		flex: 5,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	logoContainer: {
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	centerContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
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
	},
});
