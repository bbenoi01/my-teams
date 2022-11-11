import { Image, StyleSheet, Text, View } from 'react-native';

const PlayerBlock = ({ item, dimensions }) => {
	return (
		<View style={[styles.block, dimensions]}>
			<Image
				style={styles.img}
				source={{
					uri: item.PhotoUrl,
				}}
			/>
			<Text style={styles.txt}>{item.FirstName + ' ' + item.LastName}</Text>
			<View style={styles.playersContainer}>
				<View style={styles.playerWrapper}>
					<Text style={styles.txt}>Position:</Text>
					<Text style={styles.txt}>{item.Position}</Text>
				</View>
				<View style={styles.playerWrapper}>
					<Text style={styles.txt}>Age:</Text>
					<Text style={styles.txt}>{item.Age}</Text>
				</View>
				<View style={styles.playerWrapper}>
					<Text style={styles.txt}>Height:</Text>
					<Text style={styles.txt}>{item.Height}</Text>
				</View>
				<View style={styles.playerWrapper}>
					<Text style={styles.txt}>Weight:</Text>
					<Text style={styles.txt}>{item.Weight}</Text>
				</View>
				<View style={styles.playerWrapper}>
					<Text style={styles.txt}>Status:</Text>
					<Text style={styles.txt}>{item.Status}</Text>
				</View>
			</View>
		</View>
	);
};

export default PlayerBlock;

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
	playersContainer: {
		width: '100%',
	},
	playerWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
