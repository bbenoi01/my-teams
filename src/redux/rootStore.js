import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hubReducer from './slices/hubSlice';
import nflReducer from './slices/nflSlice';
import nbaReducer from './slices/nbaSlice';
import mlbReducer from './slices/mlbSlice';
import nhlReducer from './slices/nhlSlice';

const hubPersistConfig = {
	key: 'hub',
	storage: AsyncStorage,
};

const nflPersistConfig = {
	key: 'nfl',
	storage: AsyncStorage,
};

const nbaPersistConfig = {
	key: 'nba',
	storage: AsyncStorage,
};

const mlbPersistConfig = {
	key: 'mlb',
	storage: AsyncStorage,
};

const nhlPersistConfig = {
	key: 'nhl',
	storage: AsyncStorage,
};

export const store = configureStore({
	reducer: {
		hub: persistReducer(hubPersistConfig, hubReducer),
		nfl: persistReducer(nflPersistConfig, nflReducer),
		nba: persistReducer(nbaPersistConfig, nbaReducer),
		mlb: persistReducer(mlbPersistConfig, mlbReducer),
		nhl: persistReducer(nhlPersistConfig, nhlReducer),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
