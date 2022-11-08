import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HockeyMainScreen from '../features/hockey/screens/HockeyMainScreen';

const HockeyStack = createNativeStackNavigator();
export const HockeyNavigator = () => {
	return (
		<HockeyStack.Navigator screenOptions={{ headerShown: false }}>
			<HockeyStack.Screen name='HockeyMain' component={HockeyMainScreen} />
		</HockeyStack.Navigator>
	);
};
