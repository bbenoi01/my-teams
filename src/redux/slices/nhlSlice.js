import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { NHL_API_KEY_ } from '@env';
import sportsApi from '../../api/sportsApi';

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

export const nhlAdapter = createEntityAdapter();
const initialState = nhlAdapter.getInitialState({
	loading: false,
	loading: false,
	nhlTeam: null,
	nhlTeams: null,
	news: null,
	players: null,
	stats: null,
	standings: null,
	errors: null,
});

export const nhlSlice = createSlice({
	name: 'nhl',
	initialState,
	reducers: {
		clearNHLSlice: (state) => {
			state.loading = false;
			state.nhlTeams = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNHLTeams.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNHLTeams.fulfilled, (state, action) => {
				state.loading = false;
				state.nhlTeams = action.payload;
			})
			.addCase(getNHLTeams.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(clearNHLSlice, (state) => {
				nhlAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				nhlAdapter.removeAll(state);
			});
	},
});

export const { clearNHLSlice } = nhlSlice.actions;

export default nhlSlice.reducer;
