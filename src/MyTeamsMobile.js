import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/appNavigator';

export default function MyTeamsMobile() {
	return (
		<NavigationContainer>
			<AppNavigator />
		</NavigationContainer>
	);
}
