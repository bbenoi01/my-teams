import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './tabNavigator';
import SportScreen from '../features/schedules/screens/SportScreen';

const ScheduleStack = createNativeStackNavigator();
export const ScheduleNavigator = () => {
	return (
		<ScheduleStack.Navigator screenOptions={{ headerShown: false }}>
			<ScheduleStack.Screen name='Sports' component={SportScreen} />
			<ScheduleStack.Screen name='AllSchedules' component={TabNavigator} />
		</ScheduleStack.Navigator>
	);
};
