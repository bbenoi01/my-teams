import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export const hubAdapter = createEntityAdapter();
const initialState = hubAdapter.getInitialState({
	loading: false,
	spread: false,
	sport: null,
	year: '',
	nflFav: null,
	nflFavKey: null,
	nbaFav: null,
	nbaFavKey: null,
	mlbFav: null,
	mlbFavKey: null,
	nhlFav: null,
	nhlFavKey: null,
	news: null,
	players: null,
	stats: null,
	standings: null,
	errors: null,
});

export const hubSlice = createSlice({
	name: 'hub',
	initialState,
	reducers: {
		setSpread: (state) => {
			state.spread = !state.spread;
		},
		setSport: (state, action) => {
			state.sport = action.payload;
		},
		setYear: (state, action) => {
			state.year = action.payload;
		},
		setNFLFav: (state, action) => {
			state.nflFav = action.payload.split(', ')[0];
			state.nflFavKey = action.payload.split(', ')[1];
		},
		resetNFL: (state) => {
			state.nflFav = null;
			state.nflFavKey = null;
		},
		setNBAFav: (state, action) => {
			state.nbaFav = action.payload.split(', ')[0];
			state.nbaFavKey = action.payload.split(', ')[1];
		},
		resetNBA: (state) => {
			state.nbaFav = null;
			state.nbaFavKey = null;
		},
		setMLBFav: (state, action) => {
			state.mlbFav = action.payload.split(', ')[0];
			state.mlbFavKey = action.payload.split(', ')[1];
		},
		resetMLB: (state) => {
			state.mlbFav = null;
			state.mlbFavKey = null;
		},
		setNHLFav: (state, action) => {
			state.nhlFav = action.payload.split(', ')[0];
			state.nhlFavKey = action.payload.split(', ')[1];
		},
		resetNHL: (state) => {
			state.nhlFav = null;
			state.nhlFavKey = null;
		},
		clearFavs: (state) => {
			state.nflFav = null;
			state.nflFavKey = null;
			state.nbaFav = null;
			state.nbaFavKey = null;
			state.mlbFav = null;
			state.mlbFavKey = null;
			state.nhlFav = null;
			state.nhlFavKey = null;
		},
		clearHubSlice: (state) => {
			state.loading = false;
			state.year = '';
			state.nflFav = null;
			state.nflFavKey = null;
			state.nbaFav = null;
			state.nbaFavKey = null;
			state.mlbFav = null;
			state.mlbFavKey = null;
			state.nhlFav = null;
			state.nhlFavKey = null;
			state.news = null;
			state.players = null;
			state.stats = null;
			state.standings = null;
			state.errors = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(clearHubSlice, (state) => {
				hubAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				hubAdapter.removeAll(state);
				state.loading = false;
				state.spread = false;
				state.sport = null;
				state.year = '';
				state.nflFav = null;
				state.nflFavKey = null;
				state.nbaFav = null;
				state.nbaFavKey = null;
				state.mlbFav = null;
				state.mlbFavKey = null;
				state.nhlFav = null;
				state.nhlFavKey = null;
				state.news = null;
				state.players = null;
				state.stats = null;
				state.standings = null;
				state.errors = null;
			});
	},
});

export const {
	setSpread,
	setSport,
	setYear,
	setNFLFav,
	resetNFL,
	setNBAFav,
	resetNBA,
	setMLBFav,
	resetMLB,
	setNHLFav,
	resetNHL,
	clearFavs,
	clearHubSlice,
} = hubSlice.actions;

export default hubSlice.reducer;
