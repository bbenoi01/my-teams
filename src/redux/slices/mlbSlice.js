import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { MLB_API_KEY_ } from '@env';
import sportsApi from '../../api/sportsApi';

export const getMLBTeams = createAsyncThunk(
	'mlb/get_mlb_teams',
	async (mlbData, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/mlb/scores/json/teams?key=${MLB_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const mlbAdapter = createEntityAdapter();
const initialState = mlbAdapter.getInitialState({
	loading: false,
	mlbTeam: null,
	mlbTeams: null,
	news: null,
	players: null,
	stats: null,
	standings: null,
	errors: null,
});

export const mlbSlice = createSlice({
	name: 'mlb',
	initialState,
	reducers: {
		clearMLBSlice: (state) => {
			state.loading = false;
			state.mlbTeams = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMLBTeams.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})

			.addCase(getMLBTeams.fulfilled, (state, action) => {
				state.loading = false;
				state.mlbTeams = action.payload;
			})

			.addCase(getMLBTeams.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(clearMLBSlice, (state) => {
				mlbAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				mlbAdapter.removeAll(state);
			});
	},
});

export const { clearMLBSlice } = mlbSlice.actions;

export default mlbSlice.reducer;
