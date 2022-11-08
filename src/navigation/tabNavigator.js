import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { FootballNavigator } from './footballNavigator';
import { BasketballNavigator } from './basketballNavigator';
import { BaseballNavigator } from './baseballNavigator';
import { HockeyNavigator } from './hockeyNavigator';
import Topbar from '../components/Topbar';

const AppTabs = createBottomTabNavigator();
export const TabNavigator = () => {
	const TAB_ICON = {
		Football: 'sports-football',
		Basketball: 'sports-basketball',
		Baseball: 'sports-baseball',
		Hockey: 'sports-hockey',
	};

	const createScreenOptions = ({ route }) => {
		const iconName = TAB_ICON[route.name];
		return {
			headerShown: false,
			tabBarIcon: ({ size, color }) => {
				switch (route.name) {
					case 'Football':
					case 'Basketball':
					case 'Baseball':
					case 'Hockey':
						return <MaterialIcons name={iconName} size={size} color={color} />;
						break;

					default:
						break;
				}
			},
			tabBarStyle: { backgroundColor: '#16161A' },
			tabBarActiveTintColor: 'goldenrod',
			tabBarInactiveTintColor: '#94a1b2',
		};
	};

	return (
		<AppTabs.Navigator screenOptions={createScreenOptions}>
			<AppTabs.Screen name='Football' component={FootballNavigator} />
			<AppTabs.Screen name='Basketball' component={BasketballNavigator} />
			<AppTabs.Screen name='Baseball' component={BaseballNavigator} />
			<AppTabs.Screen name='Hockey' component={HockeyNavigator} />
		</AppTabs.Navigator>
	);
};
