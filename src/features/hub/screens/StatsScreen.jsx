import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { setStats } from '../../../redux/slices/measurementsSlice';
import Loading from '../../../components/Loading';
import StatBLock from '../components/StatBLock';

const StatsScreen = ({ navigation }) => {
	const { loading, sport } = useSelector((state) => state.hub);
	const { stats } = useSelector((state) => state.measure);
	const { nflStats } = useSelector((state) => state.nfl);
	const { nbaStats } = useSelector((state) => state.nba);
	const { mlbStats } = useSelector((state) => state.mlb);
	const { nhlStats } = useSelector((state) => state.nhl);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();

	const blockDimensions = {
		width: stats && stats.width - 40,
		height: stats && stats.height / 2 - 30,
	};

	let data;
	switch (sport) {
		case 'nfl':
			data = nflStats;
			break;

		case 'nba':
			data = nbaStats;
			break;

		case 'mlb':
			data = mlbStats;
			break;

		case 'nhl':
			data = nhlStats;
			break;

		default:
			data = null;
			break;
	}

	useEffect(() => {
		childRef.current.measureLayout(
			parentRef.current,
			(left, top, width, height) => {
				if (!stats || (stats.width !== width && stats.height !== height)) {
					dispatch(setStats({ left, top, width, height }));
				}
			}
		);
	}, [stats]);

	return (
		<View style={styles.canvas} ref={parentRef}>
			{loading && <Loading />}
			<Text style={[styles.txt, styles.pageTitle]}>Team Stats</Text>
			<View style={styles.listContainer} ref={childRef}>
				{data ? (
					<FlatList
						style={styles.list}
						data={data}
						renderItem={({ item }) => (
							<StatBLock item={item} dimensions={blockDimensions} />
						)}
						keyExtractor={(item) => item.Team}
					/>
				) : (
					<Text style={styles.txt}>No Stats</Text>
				)}
			</View>
		</View>
	);
};

export default StatsScreen;

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
