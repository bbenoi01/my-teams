import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loading = () => {
	return (
		<ActivityIndicator
			style={styles.loading}
			animating={true}
			color='#1170BE'
			size='large'
		/>
	);
};

export default Loading;

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		zIndex: 999,
	},
});
