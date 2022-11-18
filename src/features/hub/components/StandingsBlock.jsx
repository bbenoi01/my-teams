import { Image, StyleSheet, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

const StandingsBlock = ({ item, dimensions }) => {
	return (
		<View style={[styles.block, dimensions]}>
			<View style={styles.logoContainer}>
				<SvgUri width='75' height='75' uri={item.Logo} />
			</View>
			<View style={styles.wrapper}>
				{item.City && <Text style={styles.txt}>{item.City}</Text>}
				<Text style={styles.txt}>{item.Name}</Text>
			</View>
			<View style={styles.wrapper}>
				{item.Conference && <Text style={styles.txt}>{item.Conference} </Text>}
				{item.League && <Text style={styles.txt}>{item.League} </Text>}
				<Text style={styles.txt}>{item.Division}</Text>
			</View>
			<View style={styles.standingsContainer}>
				<View style={styles.standingWrapper}>
					<Text style={styles.txt}>Season:</Text>
					<Text style={styles.txt}>{item.Season}</Text>
				</View>
				<View style={styles.standingWrapper}>
					<Text style={styles.txt}>Wins:</Text>
					<Text style={styles.txt}>{item.Wins}</Text>
				</View>
				<View style={styles.standingWrapper}>
					<Text style={styles.txt}>Losses:</Text>
					<Text style={styles.txt}>{item.Losses}</Text>
				</View>
				<View style={styles.standingWrapper}>
					<Text style={styles.txt}>Div Rank:</Text>
					<Text style={styles.txt}>{item.DivisionRank}</Text>
				</View>
				<View style={styles.standingWrapper}>
					<Text style={styles.txt}>Div Wins:</Text>
					<Text style={styles.txt}>{item.DivisionWins}</Text>
				</View>
				<View style={styles.standingWrapper}>
					<Text style={styles.txt}>Div Losses:</Text>
					<Text style={styles.txt}>{item.DivisionLosses}</Text>
				</View>
			</View>
		</View>
	);
};

export default StandingsBlock;

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
		borderRadius: 100,
		borderWidth: 1,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
	txt: {
		color: '#94a1b2',
	},
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	standingsContainer: {
		width: '100%',
	},
	standingWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
