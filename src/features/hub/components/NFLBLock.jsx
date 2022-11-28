import { Image, StyleSheet, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

const NFLBLock = ({ dimensions, item }) => {
	return (
		<View style={[styles.block, dimensions]}>
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={item.Logo} />
			</View>
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
	);
};

export default NFLBLock;

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
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
	logo: {
		width: 75,
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
