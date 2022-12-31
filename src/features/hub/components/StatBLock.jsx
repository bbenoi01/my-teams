import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const StatBLock = ({ dimensions, item }) => {
	const { sport } = useSelector((state) => state.hub);

	return (
		<View style={[styles.block, dimensions]}>
			<View style={styles.logoContainer}>
				<Image
					style={styles.logo}
					source={item.Logo}
					resizeMethod='scale'
					resizeMode='contain'
				/>
			</View>
			<Text style={styles.txt}>
				{sport === 'nfl' ? item.TeamName : item.Name}
			</Text>
			<View style={styles.statsContainer}>
				<View style={styles.statWrapper}>
					<Text style={styles.txt}>Season:</Text>
					<Text style={styles.txt}>{item.Season}</Text>
				</View>
				{sport === 'nfl' ? (
					<>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>PF:</Text>
							<Text style={styles.txt}>{item.Score}</Text>
						</View>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>PA:</Text>
							<Text style={styles.txt}>{item.OpponentScore}</Text>
						</View>
					</>
				) : (
					<>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>Wins:</Text>
							<Text style={styles.txt}>{item.Wins}</Text>
						</View>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>Losses:</Text>
							<Text style={styles.txt}>{item.Losses}</Text>
						</View>
					</>
				)}
				{sport === 'nfl' && (
					<>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>Touchdowns:</Text>
							<Text style={styles.txt}>{item.Touchdowns}</Text>
						</View>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>Penalties:</Text>
							<Text style={styles.txt}>{item.Penalties}</Text>
						</View>
					</>
				)}
				{sport === 'nba' && (
					<>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>PPG:</Text>
							<Text style={styles.txt}>{item.Points / item.Games}</Text>
						</View>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>Turnovers:</Text>
							<Text style={styles.txt}>{item.Turnovers}</Text>
						</View>
					</>
				)}
				{sport === 'mlb' && (
					<>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>RBI:</Text>
							<Text style={styles.txt}>{item.RunsBattedIn}</Text>
						</View>
						<View style={styles.statWrapper}>
							<Text style={styles.txt}>Errors:</Text>
							<Text style={styles.txt}>{item.Errors}</Text>
						</View>
					</>
				)}
				{sport === 'nhl' && (
					<>
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
					</>
				)}
			</View>
		</View>
	);
};

export default StatBLock;

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
		width: 80,
		height: 80,
		borderRadius: 100,
		// borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'black',
	},
	logo: {
		width: 70,
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
