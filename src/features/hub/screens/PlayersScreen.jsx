import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { setPlayerDimensions } from '../../../redux/slices/hubSlice';
import Loading from '../../../components/Loading';
import PlayerBlock from '../components/PlayerBlock';

const PlayersScreen = ({ navigation }) => {
	const { loading, sport, playerDimensions } = useSelector(
		(state) => state.hub
	);
	const { nflPlayers } = useSelector((state) => state.nfl);
	const { nbaPlayers } = useSelector((state) => state.nba);
	const { mlbPlayers } = useSelector((state) => state.mlb);
	const { nhlPlayers } = useSelector((state) => state.nhl);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();

	const blockDimensions = {
		width: playerDimensions && playerDimensions.width - 40,
		height: playerDimensions && playerDimensions.height / 2 - 30,
	};

	let data;
	switch (sport) {
		case 'nfl':
			data = nflPlayers;
			break;

		case 'nba':
			data = nbaPlayers;
			break;

		case 'mlb':
			data = mlbPlayers;
			break;

		case 'nhl':
			data = nhlPlayers;
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
					!playerDimensions ||
					(playerDimensions.width !== width &&
						playerDimensions.height !== height)
				) {
					dispatch(setPlayerDimensions({ left, top, width, height }));
				}
			}
		);
	}, [playerDimensions]);

	return (
		<View style={styles.canvas} ref={parentRef}>
			{loading && <Loading />}
			<Text style={[styles.txt, styles.pageTitle]}>Players</Text>
			<View style={styles.listContainer} ref={childRef}>
				{data ? (
					<FlatList
						style={styles.list}
						data={data}
						renderItem={({ item }) => (
							<PlayerBlock item={item} dimensions={blockDimensions} />
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
