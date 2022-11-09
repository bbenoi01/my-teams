import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { HubNavigator } from './hubNavigator';
import { TabNavigator } from './tabNavigator';
import Topbar from '../components/Topbar';

const AppDrawer = createDrawerNavigator();
export const AppNavigator = () => {
	const TAB_ICON = {
		Hub: 'dashboard',
		Schedules: 'calendar',
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

					default:
						break;
				}
			},
			drawerActiveTintColor: 'whitesmoke',
			drawerInactiveTintColor: '#94a1b2',
			drawerStyle: {
				backgroundColor: '#242629',
			},
		};
	};

	return (
		<AppDrawer.Navigator
			initialRouteName='Hub'
			screenOptions={createScreenOptions}
		>
			<AppDrawer.Screen name='Hub' component={HubNavigator} />
			<AppDrawer.Screen name='Schedules' component={TabNavigator} />
		</AppDrawer.Navigator>
	);
};
