import { Header } from '@rneui/themed';

const Topbar = ({ navigation }) => {
	return (
		<Header
			barStyle='light-content'
			backgroundColor='#051625'
			centerComponent={{ title: 'My Teams' }}
		/>
	);
};

export default Topbar;
