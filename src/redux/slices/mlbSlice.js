import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sportsApi from '../../api/sportsApi';
import { MLB_API_KEY_ } from '@env';

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

export const mlbSlice = createSlice({
	name: 'mlb',
	initialState: {
		loading: false,
		mlbTeam: null,
		mlbTeams: null,
		news: null,
		players: null,
		stats: null,
		standings: null,
		errors: null,
	},
	reducers: {},
	extraReducers: {
		[getMLBTeams.pending]: (state) => {
			state.loading = true;
			state.errors = null;
		},
		[getMLBTeams.fulfilled]: (state, action) => {
			state.loading = false;
			state.mlbTeams = action.payload;
		},
		[getMLBTeams.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload;
		},
	},
});

export const {} = mlbSlice.actions;

export default mlbSlice.reducer;
