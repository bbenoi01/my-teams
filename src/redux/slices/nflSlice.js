import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sportsApi from '../../api/sportsApi';
import { NFL_API_KEY_ } from '@env';

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

export const nflSlice = createSlice({
	name: 'nfl',
	initialState: {
		loading: false,
		nflTeam: null,
		nflTeams: null,
		news: null,
		players: null,
		stats: null,
		standings: null,
		errors: null,
	},
	reducers: {},
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
			});
	},
});

export const {} = nflSlice.actions;

export default nflSlice.reducer;
