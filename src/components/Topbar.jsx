import { StyleSheet } from 'react-native';
import { Header } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';

const Topbar = ({ navigation }) => {
	const handlePress = () => {
		navigation.openDrawer();
	};

	return (
		<Header
			barStyle='light-content'
			backgroundColor='#16161A'
			leftComponent={
				<MaterialIcons
					name='menu'
					size={28}
					style={styles.icon}
					onPress={handlePress}
				/>
			}
			centerComponent={{ text: 'My Teams', style: { color: '#94a1b2' } }}
		/>
	);
};

export default Topbar;

const styles = StyleSheet.create({
	icon: {
		color: '#94a1b2',
		alignSelf: 'center',
	},
});
