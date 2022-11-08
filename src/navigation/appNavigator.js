import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './tabNavigator';
import Topbar from '../components/Topbar';
import HubScreen from '../features/hub/screens/HubScreen';

const AppStack = createNativeStackNavigator();
export const AppNavigator = () => {
	const createScreenOptions = () => {
		return {
			header: ({ route, navigation }) => (
				<Topbar route={route} navigation={navigation} />
			),
		};
	};

	return (
		<AppStack.Navigator screenOptions={createScreenOptions}>
			<AppStack.Screen name='Hub' component={HubScreen} />
			<AppStack.Screen name='Sports' component={TabNavigator} />
		</AppStack.Navigator>
	);
};
