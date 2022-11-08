import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BasketballMainScreen from '../features/basketball/screens/BasketballMainScreen';

const BasketballStack = createNativeStackNavigator();
export const BasketballNavigator = () => {
	return (
		<BasketballStack.Navigator screenOptions={{ headerShown: false }}>
			<BasketballStack.Screen
				name='BasketballMain'
				component={BasketballMainScreen}
			/>
		</BasketballStack.Navigator>
	);
};
