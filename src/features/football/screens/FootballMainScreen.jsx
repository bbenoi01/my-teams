import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { setSchedule } from '../../../redux/slices/measurementsSlice';
import FullScreen from '../../../components/FullScreen';
import Picker from '../../../components/Picker';

const FootballMainScreen = () => {
	const { sport } = useSelector((state) => state.hub);
	const { schedule } = useSelector((state) => state.measure);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const dispatch = useDispatch();
	let data = true;

	const blockDimensions = {
		width: schedule && schedule.width - 40,
		height: schedule && schedule.height - 30,
	};

	useEffect(() => {
		childRef.current.measureLayout(
			parentRef.current,
			(left, top, width, height) => {
				if (
					!schedule ||
					(schedule.width !== width && schedule.height !== height)
				) {
					dispatch(setSchedule({ left, top, width, height }));
				}
			}
		);
	}, [schedule]);

	return (
		<FullScreen img={require('../../../../assets/nflBackground.jpg')}>
			<View style={styles.canvas} ref={parentRef}>
				<View style={styles.header}>
					<Text style={styles.txt}>Fav Team: Raiders</Text>
					<Text style={styles.txt}>Current Record: 2-6-0</Text>
				</View>
				<View style={styles.searchContainer}>
					<View style={styles.searchInputContainer}>
						<View style={styles.searchInput}>
							<Picker options={[]} />
						</View>
						<View style={styles.searchInput}>
							<TextInput placeholder='Year' />
						</View>
					</View>
					<Button title='Get Schedule' />
				</View>
				<View style={styles.listContainer} ref={childRef}>
					{data ? (
						<>
							{/* <View style={[styles.test, blockDimensions]}>
								<Text>Flat List</Text>
							</View> */}
							<View
								style={[
									styles.test,
									blockDimensions,
									{ borderWidth: 1, borderColor: 'white' },
								]}
							>
								<Text>Flat List</Text>
							</View>
						</>
					) : (
						<Text>No Schedule</Text>
					)}
				</View>
			</View>
		</FullScreen>
	);
};

export default FootballMainScreen;

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		padding: 20,
		// justifyContent: 'center',
		// alignContent: 'center',
	},
	header: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#242629e8',
		marginBottom: 10,
	},
	txt: {
		color: '#94a1b2',
	},
	searchContainer: {
		height: 100,
		backgroundColor: '#242629e8',
		justifyContent: 'center',
	},
	searchInputContainer: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	searchInput: {
		width: '50%',
	},
	listContainer: {
		flex: 1,
		borderWidth: 1,
		borderColor: 'rebeccapurple',
		justifyContent: 'center',
		alignItems: 'center',
	},

	test: {
		backgroundColor: 'black',
		marginVertical: 10,
	},
});
