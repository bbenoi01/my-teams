import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/rootStore';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';
import MyTeamsMobile from './src/MyTeamsMobile';

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SelectProvider>
					<MyTeamsMobile />
				</SelectProvider>
			</PersistGate>
		</Provider>
	);
}
