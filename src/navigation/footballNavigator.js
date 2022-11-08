import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FootballMainScreen from '../features/football/screens/FootballMainScreen';

const FootballStack = createNativeStackNavigator();
export const FootballNavigator = () => {
	return (
		<FootballStack.Navigator screenOptions={{ headerShown: false }}>
			<FootballStack.Screen
				name='FootballMain'
				component={FootballMainScreen}
			/>
		</FootballStack.Navigator>
	);
};
