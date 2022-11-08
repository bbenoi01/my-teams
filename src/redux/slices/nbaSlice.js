import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sportsApi from '../../api/sportsApi';
import { NBA_API_KEY_ } from '@env';

export const getNBATeams = createAsyncThunk(
	'nba/get_nba_teams',
	async (nbaData, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/nba/scores/json/teams?key=${NBA_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const nbaSlice = createSlice({
	name: 'nba',
	initialState: {
		loading: false,
		nbaTeam: null,
		nbaTeams: null,
		news: null,
		players: null,
		stats: null,
		standings: null,
		errors: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getNBATeams.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})

			.addCase(getNBATeams.fulfilled, (state, action) => {
				state.loading = false;
				state.nbaTeams = action.payload;
			})

			.addCase(getNBATeams.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const {} = nbaSlice.actions;

export default nbaSlice.reducer;
