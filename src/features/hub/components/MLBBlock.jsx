import { Image, StyleSheet, Text, View } from 'react-native';

const MLBBlock = ({ dimensions, item }) => {
	return (
		<View style={[styles.block, dimensions]}>
			<Image
				style={styles.img}
				source={{
					uri: 'https://i.ebayimg.com/images/g/P0AAAOSwKwlgFpA6/s-l400.jpg',
				}}
			/>
			<Text style={styles.txt}>{item.Name}</Text>
			<View style={styles.statsContainer}>
				<View style={styles.statWrapper}>
					<Text style={styles.txt}>Season:</Text>
					<Text style={styles.txt}>{item.Season}</Text>
				</View>
				<View style={styles.statWrapper}>
					<Text style={styles.txt}>Wins:</Text>
					<Text style={styles.txt}>{item.Wins}</Text>
				</View>
				<View style={styles.statWrapper}>
					<Text style={styles.txt}>Losses:</Text>
					<Text style={styles.txt}>{item.Losses}</Text>
				</View>
				<View style={styles.statWrapper}>
					<Text style={styles.txt}>RBI:</Text>
					<Text style={styles.txt}>{item.RunsBattedIn}</Text>
				</View>
				<View style={styles.statWrapper}>
					<Text style={styles.txt}>Errors:</Text>
					<Text style={styles.txt}>{item.Errors}</Text>
				</View>
			</View>
		</View>
	);
};

export default MLBBlock;

const styles = StyleSheet.create({
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
	txt: {
		color: '#94a1b2',
	},
	statsContainer: {
		width: '100%',
	},
	statWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
