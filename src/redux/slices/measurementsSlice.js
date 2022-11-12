import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export const measurementAdapter = createEntityAdapter();
const initialState = measurementAdapter.getInitialState({
	loading: false,
	tab: null,
	stats: null,
	player: null,
	standings: null,
	schedule: null,
	errors: null,
});

export const measurementSlice = createSlice({
	name: 'measure',
	initialState,
	reducers: {
		setTab: (state, action) => {
			state.tab = action.payload;
		},
		setStats: (state, action) => {
			state.stats = action.payload;
		},
		setPlayer: (state, action) => {
			state.player = action.payload;
		},
		setStandings: (state, action) => {
			state.standings = action.payload;
		},
		setSchedule: (state, action) => {
			state.schedule = action.payload;
		},
		clearMeasureSlice: (state) => {
			state.loading = false;
			state.tab = null;
			state.stats = null;
			state.player = null;
			state.standings = null;
			state.schedule = null;
			state.errors = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(clearMeasureSlice, (state) => {
				measurementAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				measurementAdapter.removeAll(state);
				state.loading = false;
				state.tab = null;
				state.stats = null;
				state.player = null;
				state.standings = null;
				state.schedule = null;
				state.errors = null;
			});
	},
});

export const {
	setTab,
	setStats,
	setPlayer,
	setStandings,
	setSchedule,
	clearMeasureSlice,
} = measurementSlice.actions;

export default measurementSlice.reducer;
