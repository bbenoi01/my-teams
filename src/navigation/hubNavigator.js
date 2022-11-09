import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HubScreen from '../features/hub/screens/HubScreen';
import NewsScreen from '../features/hub/screens/NewsScreen';
import StatsScreen from '../features/hub/screens/StatsScreen';
import PlayersScreen from '../features/hub/screens/PlayersScreen';
import StandingsScreen from '../features/hub/screens/StandingsScreen';

const HubStack = createNativeStackNavigator();
export const HubNavigator = () => {
	return (
		<HubStack.Navigator screenOptions={{ headerShown: false }}>
			<HubStack.Screen name='HubMain' component={HubScreen} />
			<HubStack.Screen name='News' component={NewsScreen} />
			<HubStack.Screen name='Stats' component={StatsScreen} />
			<HubStack.Screen name='Players' component={PlayersScreen} />
			<HubStack.Screen name='Standings' component={StandingsScreen} />
		</HubStack.Navigator>
	);
};
