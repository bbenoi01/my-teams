import { createSlice } from '@reduxjs/toolkit';

export const measurementSlice = createSlice({
	name: 'measure',
	initialState: {
		loading: false,
		tab: null,
		stats: null,
		player: null,
		standings: null,
		schedule: null,
		errors: null,
	},
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
