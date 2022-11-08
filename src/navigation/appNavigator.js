import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HubScreen from '../features/hub/screens/HubScreen';
import { TabNavigator } from './tabNavigator';

const AppStack = createNativeStackNavigator();
export const AppNavigator = () => {
	return (
		<AppStack.Navigator screenOptions={{ headerShown: false }}>
			<AppStack.Screen name='Hub' component={HubScreen} />
			<AppStack.Group name='Sports' component={TabNavigator} />
		</AppStack.Navigator>
	);
};
