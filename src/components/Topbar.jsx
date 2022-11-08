import { Header } from '@rneui/themed';

const Topbar = ({ navigation }) => {
	return (
		<Header
			barStyle='light-content'
			backgroundColor='#16161A'
			centerComponent={{ text: 'My Teams', style: { color: '#94a1b2' } }}
		/>
	);
};

export default Topbar;
