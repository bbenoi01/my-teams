import { StyleSheet, Text, View } from 'react-native';
import { logoMap, byeMap } from '../../../util/helpers';
import { nflLogos, nbaLogos, mlbLogos, nhlLogos } from '../../../data';
import dayjs from 'dayjs';
import MapView from 'react-native-maps';

const GameBlock = ({
	blockDimensions,
	logoContainerSize,
	logo,
	scoreTxt,
	centerTxt,
	item,
}) => {
	return (
		<View style={[styles.canvas, blockDimensions]}>
			<View style={styles.weekContainer}>
				<Text style={[styles.txt, styles.blockTxt]}>Week: {item.Week}</Text>
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
							<View style={[styles.logoContainer, logoContainerSize]}>
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
							<View style={[styles.logoContainer, logoContainerSize]}>
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
					{item.ForecastDescription ? item.ForecastDescription : 'TBA'}
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
	);
};

export default GameBlock;

const styles = StyleSheet.create({
	canvas: {
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
