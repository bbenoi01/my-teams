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
	tabDimensions: null,
	statDimensions: null,
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
		setNFLFav: (state, action) => {
			state.nflFav = action.payload.split(', ')[0];
			state.nflFavKey = action.payload.split(', ')[1];
		},
		setNBAFav: (state, action) => {
			state.nbaFav = action.payload.split(', ')[0];
			state.nbaFavKey = action.payload.split(', ')[1];
		},
		setMLBFav: (state, action) => {
			state.mlbFav = action.payload.split(', ')[0];
			state.mlbFavKey = action.payload.split(', ')[1];
		},
		setNHLFav: (state, action) => {
			state.nhlFav = action.payload.split(', ')[0];
			state.nhlFavKey = action.payload.split(', ')[1];
		},
		setTabDimensions: (state, action) => {
			state.tabDimensions = action.payload;
		},
		setStatDimensions: (state, action) => {
			state.statDimensions = action.payload;
		},
		clearHubSlice: (state) => {
			state.loading = false;
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
			state.tabDimensions = null;
			state.statDimensions = null;
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
				state.tabDimensions = null;
				state.statDimensions = null;
				state.errors = null;
			});
	},
});

export const {
	setSpread,
	setSport,
	setNFLFav,
	setNBAFav,
	setMLBFav,
	setNHLFav,
	setTabDimensions,
	setStatDimensions,
	clearHubSlice,
} = hubSlice.actions;

export default hubSlice.reducer;
