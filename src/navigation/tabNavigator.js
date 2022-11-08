import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { FootballNavigator } from './footballNavigator';
import { BasketballNavgator } from './basketballNavigator';
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
			header: ({ route, navigation }) => (
				<Topbar route={route} navigation={navigation} />
			),
			tabBarIcon: ({ size, color }) => {
				route.name === 'Football' && (
					<MaterialIcons name={iconName} size={size} color={color} />
				);
				route.name === 'Basketball' && (
					<MaterialIcons name={iconName} size={size} color={color} />
				);
				route.name === 'Baseball' && (
					<MaterialIcons name={iconName} size={size} color={color} />
				);
				route.name === 'Hockey' && (
					<MaterialIcons name={iconName} size={size} color={color} />
				);
			},
			tabBarStyle: { backgroundColor: '#051625' },
			tabBarActiveTintColor: 'goldenrod',
			tabBarInactiveTintColor: 'whitesmoke',
		};
	};

	return (
		<AppTabs.Navigator screenOptions={createScreenOptions}>
			<AppTabs.Screen name='Football' component={FootballNavigator} />
			<AppTabs.Screen name='Basketball' component={BasketballNavgator} />
			<AppTabs.Screen name='Baseball' component={BaseballNavigator} />
			<AppTabs.Screen name='Hockey' component={HockeyNavigator} />
		</AppTabs.Navigator>
	);
};
