import { Image, StyleSheet, Text, View } from 'react-native';
import { formatAge, formatHeight } from '../../../util/helpers';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const PlayerBlock = ({ item, dimensions, sport }) => {
	return (
		<View style={[styles.block, dimensions]}>
			<View style={styles.imgContainer}>
				<Image
					style={styles.img}
					source={{
						uri: item.PhotoUrl,
					}}
				/>
			</View>
			<Text style={styles.txt}>{item.FirstName + ' ' + item.LastName}</Text>
			<View style={styles.playersContainer}>
				<View style={styles.playerWrapper}>
					<Text style={styles.txt}>Position:</Text>
					<Text style={styles.txt}>{item.Position}</Text>
				</View>
				<View style={styles.playerWrapper}>
					<Text style={styles.txt}>Age:</Text>
					<Text style={styles.txt}>
						{formatAge(dayjs(item.BirthDate).fromNow(true))}
					</Text>
				</View>
				<View style={styles.playerWrapper}>
					<Text style={styles.txt}>Height:</Text>
					<Text style={styles.txt}>
						{sport === 'nfl' ? item.Height : formatHeight(item.Height)}
					</Text>
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
	imgContainer: {
		width: 100,
		height: 100,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: 'silver',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
	img: {
		width: 60,
		height: 60,
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
