import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BaseballMainScreen from '../features/baseball/screens/BaseballMainScreen';

const BaseballStack = createNativeStackNavigator();
export const BaseballNavigator = () => {
	return (
		<BaseballStack.Navigator screenOptions={{ headerShown: false }}>
			<BaseballStack.Screen
				name='BaseballMain'
				component={BaseballMainScreen}
			/>
		</BaseballStack.Navigator>
	);
};
