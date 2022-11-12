import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { setPlayer } from '../../../redux/slices/measurementsSlice';
import Loading from '../../../components/Loading';
import PlayerBlock from '../components/PlayerBlock';

const PlayersScreen = ({ navigation }) => {
	const { loading, sport, nflFav, nbaFav, mlbFav, nhlFav } = useSelector(
		(state) => state.hub
	);
	const { player } = useSelector((state) => state.measure);
	const { nflPlayers } = useSelector((state) => state.nfl);
	const { nbaPlayers } = useSelector((state) => state.nba);
	const { mlbPlayers } = useSelector((state) => state.mlb);
	const { nhlPlayers } = useSelector((state) => state.nhl);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();

	const blockDimensions = {
		width: player && player.width - 40,
		height: player && player.height / 2 - 30,
	};

	let data;
	let team;
	switch (sport) {
		case 'nfl':
			data = nflPlayers;
			team = nflFav;
			break;

		case 'nba':
			data = nbaPlayers;
			team = nbaFav;
			break;

		case 'mlb':
			data = mlbPlayers;
			team = mlbFav;
			break;

		case 'nhl':
			data = nhlPlayers;
			team = nhlFav;
			break;

		default:
			data = null;
			team = null;
			break;
	}

	useEffect(() => {
		childRef.current.measureLayout(
			parentRef.current,
			(left, top, width, height) => {
				if (!player || (player.width !== width && player.height !== height)) {
					dispatch(setPlayer({ left, top, width, height }));
				}
			}
		);
	}, [player]);

	return (
		<View style={styles.canvas} ref={parentRef}>
			{loading && <Loading />}
			<Text style={[styles.txt, styles.pageTitle]}>
				{team && team + ' '}Players
			</Text>
			<View style={styles.listContainer} ref={childRef}>
				{data ? (
					<FlatList
						style={styles.list}
						data={data}
						renderItem={({ item }) => (
							<PlayerBlock
								item={item}
								dimensions={blockDimensions}
								sport={sport}
							/>
						)}
						keyExtractor={(item) => item.PlayerID}
					/>
				) : (
					<Text style={styles.txt}>No Players</Text>
				)}
			</View>
		</View>
	);
};

export default PlayersScreen;

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
