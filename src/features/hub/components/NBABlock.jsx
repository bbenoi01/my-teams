import { Image, StyleSheet, Text, View } from 'react-native';

const NBABlock = ({ dimensions, item }) => {
	return (
		<View style={[styles.block, dimensions]}>
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={item.Logo} />
			</View>
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
					<Text style={styles.txt}>PPG:</Text>
					<Text style={styles.txt}>{item.Points / item.Games}</Text>
				</View>
				<View style={styles.statWrapper}>
					<Text style={styles.txt}>Turnovers:</Text>
					<Text style={styles.txt}>{item.Turnovers}</Text>
				</View>
			</View>
		</View>
	);
};

export default NBABlock;

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
	logoContainer: {
		width: 100,
		height: 100,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
	logo: {
		width: 75,
		height: 75,
		borderRadius: 100,
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
