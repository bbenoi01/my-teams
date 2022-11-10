import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const NewsScreen = () => {
	const { sport } = useSelector((state) => state.hub);
	const { nflNews } = useSelector((state) => state.nfl);
	const { nbaNews } = useSelector((state) => state.nba);
	const { mlbNews } = useSelector((state) => state.mlb);
	const { nhlNews } = useSelector((state) => state.nhl);
	const dispatch = useDispatch();

	let data;
	switch (sport) {
		case 'nfl':
			data = nflNews;
			break;

		case 'nba':
			data = nbaNews;
			break;

		case 'mlb':
			data = mlbNews;
			break;

		case 'nhl':
			data = nhlNews;
			break;

		default:
			data = [];
			break;
	}

	return (
		<View style={styles.canvas}>
			<Text style={styles.txt}>News</Text>
		</View>
	);
};

export default NewsScreen;

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#242629',
		padding: 20,
	},
	txt: {
		color: '#94a1b2',
	},
});
