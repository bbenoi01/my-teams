import { useDispatch, useSelector } from 'react-redux';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

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
			data = null;
			break;
	}

	return (
		<View style={styles.canvas}>
			<Text style={styles.txt}>{sport.toUpperCase()} News</Text>
			{data ? (
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => WebBrowser.openBrowserAsync(`${item.Url}`)}
						>
							<View style={styles.block}>
								<Text style={[styles.txt, styles.title]}>{item.Title}</Text>
								<Text style={styles.txt} ellipsizeMode='tail' numberOfLines={5}>
									{item.Content}
								</Text>
							</View>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item.NewsID}
				/>
			) : (
				<Text style={styles.txt}>No News</Text>
			)}
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
	block: {
		borderWidth: 1,
		borderColor: '#94a1b2',
		borderStyle: 'dotted',
		borderRadius: 20,
		padding: 20,
		marginVertical: 10,
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 10,
	},
});
