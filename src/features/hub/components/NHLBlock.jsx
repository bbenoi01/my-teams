import { Image, StyleSheet, Text, View } from 'react-native';

const NHLBlock = ({ dimensions, item }) => {
	return (
		<View style={[styles.block, dimensions]}>
			<Image
				style={styles.img}
				source={{
					uri: 'https://logos-world.net/wp-content/uploads/2020/12/San-Jose-Sharks-Logo-1991-1998.png',
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
					<Text style={styles.txt}>Goals:</Text>
					<Text style={styles.txt}>{item.Goals}</Text>
				</View>
				<View style={styles.statWrapper}>
					<Text style={styles.txt}>Blocks:</Text>
					<Text style={styles.txt}>{item.Blocks}</Text>
				</View>
				<View style={styles.statWrapper}>
					<Text style={styles.txt}>Penalty Min:</Text>
					<Text style={styles.txt}>{item.PenaltyMinutes}</Text>
				</View>
			</View>
		</View>
	);
};

export default NHLBlock;

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
