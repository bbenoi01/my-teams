import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { NFL_API_KEY_ } from '@env';
import sportsApi from '../../api/sportsApi';

export const getNFLTeams = createAsyncThunk(
	'nfl/get_nfl_teams',
	async (nflData, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/nfl/scores/json/Teams?key=${NFL_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const nflAdapter = createEntityAdapter();
const initialState = nflAdapter.getInitialState({
	loading: false,
	nflTeam: null,
	nflTeams: null,
	news: null,
	players: null,
	stats: null,
	standings: null,
	errors: null,
});

export const nflSlice = createSlice({
	name: 'nfl',
	initialState,
	reducers: {
		clearNFLSlice: (state) => {
			state.loading = false;
			state.nflTeams = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNFLTeams.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})

			.addCase(getNFLTeams.fulfilled, (state, action) => {
				state.loading = false;
				state.nflTeams = action.payload;
			})

			.addCase(getNFLTeams.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(clearNFLSlice, (state) => {
				nflAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				nflAdapter.removeAll(state);
			});
	},
});

export const { clearNFLSlice } = nflSlice.actions;

export default nflSlice.reducer;
