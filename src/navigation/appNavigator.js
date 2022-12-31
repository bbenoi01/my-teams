import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { HubNavigator } from './hubNavigator';
import { ScheduleNavigator } from './scheduleNavigator';
import Topbar from '../components/Topbar';
import SettingsScreen from '../features/settings/screens/SettingsScreen';

const AppDrawer = createDrawerNavigator();
export const AppNavigator = () => {
	const TAB_ICON = {
		Hub: 'dashboard',
		Schedules: 'calendar',
		Settings: 'settings',
	};
	const createScreenOptions = ({ route }) => {
		const iconName = TAB_ICON[route.name];
		return {
			header: ({ route, navigation }) => (
				<Topbar route={route} navigation={navigation} />
			),
			drawerIcon: ({ size, color, focused }) => {
				switch (route.name) {
					case 'Hub':
						return (
							<MaterialIcons
								name={iconName}
								size={size}
								color={color}
								focused={focused}
							/>
						);
						break;

					case 'Schedules':
						return (
							<AntDesign
								name={iconName}
								size={size}
								color={color}
								focused={focused}
							/>
						);
						break;

					case 'Settings':
						return (
							<MaterialIcons
								name={iconName}
								size={size}
								color={color}
								focused={focused}
							/>
						);
						break;

					default:
						break;
				}
			},
			drawerActiveTintColor: 'whitesmoke',
			drawerInactiveTintColor: '#94a1b2',
			drawerStyle: {
				backgroundColor: '#242629',
			},
			swipeEnabled: false,
		};
	};

	return (
		<AppDrawer.Navigator
			initialRouteName='Hub'
			screenOptions={createScreenOptions}
		>
			<AppDrawer.Screen name='Hub' component={HubNavigator} />
			<AppDrawer.Screen name='Schedules' component={ScheduleNavigator} />
			<AppDrawer.Screen name='Settings' component={SettingsScreen} />
		</AppDrawer.Navigator>
	);
};
