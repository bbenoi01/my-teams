import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sportsApi from '../../api/sportsApi';
import { NHL_API_KEY_ } from '@env';

export const getNHLTeams = createAsyncThunk(
	'nhl/get_nhl_teams',
	async (nhlData, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/nhl/scores/json/teams?key=${NHL_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const nhlSlice = createSlice({
	name: 'nhl',
	initialState: {
		loading: false,
		loading: false,
		nhlTeam: null,
		nhlTeams: null,
		news: null,
		players: null,
		stats: null,
		standings: null,
		errors: null,
	},
	reducers: {},
	extraReducers: {
		[getNHLTeams.pending]: (state) => {
			state.loading = true;
			state.errors = null;
		},
		[getNHLTeams.fulfilled]: (state, action) => {
			state.loading = false;
			state.nhlTeams = action.payload;
		},
		[getNHLTeams.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload;
		},
	},
});

export const {} = nhlSlice.actions;

export default nhlSlice.reducer;
