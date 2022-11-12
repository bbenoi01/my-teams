import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { setStandings } from '../../../redux/slices/measurementsSlice';
import Loading from '../../../components/Loading';
import StandingsBlock from '../components/StandingsBlock';

const StandingsScreen = ({ navigation }) => {
	const { loading, sport } = useSelector((state) => state.hub);
	const { standings } = useSelector((state) => state.measure);
	const { nflStandings } = useSelector((state) => state.nfl);
	const { nbaStandings } = useSelector((state) => state.nba);
	const { mlbStandings } = useSelector((state) => state.mlb);
	const { nhlStandings } = useSelector((state) => state.nhl);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();

	const blockDimensions = {
		width: standings && standings.width - 40,
		height: standings && standings.height / 2 - 30,
	};

	let data;
	switch (sport) {
		case 'nfl':
			data = nflStandings;
			break;

		case 'nba':
			data = nbaStandings;
			break;

		case 'mlb':
			data = mlbStandings;
			break;

		case 'nhl':
			data = nhlStandings;
			break;

		default:
			data = null;
			break;
	}

	useEffect(() => {
		childRef.current.measureLayout(
			parentRef.current,
			(left, top, width, height) => {
				if (
					!standings ||
					(standings.width !== width && standings.height !== height)
				) {
					dispatch(setStandings({ left, top, width, height }));
				}
			}
		);
	}, [standings]);

	return (
		<View style={styles.canvas} ref={parentRef}>
			{loading && <Loading />}
			<Text style={[styles.txt, styles.pageTitle]}>
				{sport && sport.toUpperCase()} Standings
			</Text>
			<View style={styles.listContainer} ref={childRef}>
				{data ? (
					<FlatList
						style={styles.list}
						data={data}
						renderItem={({ item }) => (
							<StandingsBlock item={item} dimensions={blockDimensions} />
						)}
						keyExtractor={(item) => item.TeamID}
					/>
				) : (
					<Text style={styles.txt}>No Standings</Text>
				)}
			</View>
		</View>
	);
};

export default StandingsScreen;

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#16161A',
		padding: 20,
	},
	txt: {
		color: '#94a1b2',
	},
	pageTitle: {
		textAlign: 'center',
		marginVertical: 20,
	},
	listContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		paddingVertical: 10,
	},
});
