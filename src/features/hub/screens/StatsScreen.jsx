import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { setStatDimensions } from '../../../redux/slices/hubSlice';
import Loading from '../../../components/Loading';

const StatsScreen = ({ navigation }) => {
	const { loading, sport, statDimensions } = useSelector((state) => state.hub);
	const { nflStats } = useSelector((state) => state.nfl);
	const { nbaStats } = useSelector((state) => state.nba);
	const { mlbStats } = useSelector((state) => state.mlb);
	const { nhlStats } = useSelector((state) => state.nhl);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();

	const blockDimensions = {
		width: statDimensions && statDimensions.width - 40,
		height: statDimensions && statDimensions.height / 2 - 30,
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
				if (
					!statDimensions ||
					(statDimensions.width !== width && statDimensions.height !== height)
				) {
					dispatch(setStatDimensions({ left, top, width, height }));
				}
			}
		);
	}, [statDimensions]);

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
							<View style={[styles.block, blockDimensions]}>
								<Image
									style={styles.img}
									source={{
										uri: 'https://qph.cf2.quoracdn.net/main-qimg-042afa7d0b17935614aaeea8d8c12647-lq',
									}}
								/>
								<Text style={styles.txt}>{item.TeamName}</Text>
								<View style={styles.statsContainer}>
									<View style={styles.statWrapper}>
										<Text style={styles.txt}>Season:</Text>
										<Text style={styles.txt}>{item.Season}</Text>
									</View>
									<View style={styles.statWrapper}>
										<Text style={styles.txt}>PF:</Text>
										<Text style={styles.txt}>{item.Score}</Text>
									</View>
									<View style={styles.statWrapper}>
										<Text style={styles.txt}>PA:</Text>
										<Text style={styles.txt}>{item.OpponentScore}</Text>
									</View>
									<View style={styles.statWrapper}>
										<Text style={styles.txt}>Touchdowns:</Text>
										<Text style={styles.txt}>{item.Touchdowns}</Text>
									</View>
									<View style={styles.statWrapper}>
										<Text style={styles.txt}>Penalties:</Text>
										<Text style={styles.txt}>{item.Penalties}</Text>
									</View>
								</View>
							</View>
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
		borderWidth: 1,
		borderColor: 'red',
		flex: 1,
		width: '100%',
		alignItems: 'center',
		paddingVertical: 10,
	},
	block: {
		justifyContent: 'space-around',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#94a1b2',
		borderStyle: 'dotted',
		borderRadius: 20,
		padding: 20,
		marginVertical: 10,
		backgroundColor: '#232629',
	},
	img: {
		width: 60,
		height: 60,
		borderRadius: 50,
		borderWidth: 1,
	},
	statsContainer: {
		width: '100%',
	},
	statWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
