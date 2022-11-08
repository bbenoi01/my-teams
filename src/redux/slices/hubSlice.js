import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const hubSlice = createSlice({
	name: 'hub',
	initialState: {
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
	},
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
	},
});

export const {
	setSpread,
	setSport,
	setNFLFav,
	setNBAFav,
	setMLBFav,
	setNHLFav,
} = hubSlice.actions;

export default hubSlice.reducer;
