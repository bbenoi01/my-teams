import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { NHL_API_KEY_ } from '@env';
import { nhlLogos } from '../../data';
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

export const getNHLNews = createAsyncThunk(
	'nhl/get_news',
	async (nhlData, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/nhl/scores/json/News?key=${NHL_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getNHLFavTeamPlayers = createAsyncThunk(
	'nhl/get_fav_team_players',
	async (team, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/nhl/scores/json/Players/${team}?key=${NHL_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getNHLTeamStats = createAsyncThunk(
	'nhl/get_team_stats',
	async (nhlData, { rejectWithValue }) => {
		try {
			const season = await sportsApi.get(
				`/nhl/scores/json/CurrentSeason?key=${NHL_API_KEY_}`
			);
			const statRes = await sportsApi.get(
				`/nhl/scores/json/TeamSeasonStats/${season.data.Season}?key=${NHL_API_KEY_}`
			);
			let stats = statRes.data;
			stats.forEach((item) => {
				for (let i = 0; i < nhlLogos.length; i++) {
					if (item.Team === nhlLogos[i].key) {
						item.Logo = nhlLogos[i].logoUrl;
					}
				}
			});

			return stats;
		} catch (err) {
			if (err.response.data.Code === 401) {
				const retryRes = await sportsApi.get(
					`/nhl/scores/json/TeamSeasonStats/${
						season.data.Season - 1
					}?key=${NHL_API_KEY_}`
				);
				let retry = retryRes.data;
				retry.forEach((item) => {
					for (let i = 0; i < nhlLogos.length; i++) {
						if (item.Team === nhlLogos[i].key) {
							item.Logo = nhlLogos[i].logoUrl;
						}
					}
				});
				return { code: err.response.data.Code, retryRes: retry };
			} else {
				return rejectWithValue(err.response.data);
			}
		}
	}
);

export const getNHLStandings = createAsyncThunk(
	'nhl/get_standings',
	async (nhlData, { rejectWithValue }) => {
		try {
			const season = await sportsApi.get(
				`/nhl/scores/json/CurrentSeason?key=${NHL_API_KEY_}`
			);
			const standingsRes = await sportsApi.get(
				`/nhl/scores/json/Standings/${season.data.Season}?key=${NHL_API_KEY_}`
			);
			let standings = standingsRes.data;
			standings.forEach((item) => {
				for (let i = 0; i < nhlLogos.length; i++) {
					if (item.Key === nhlLogos[i].key) {
						item.Logo = nhlLogos[i].logoUrl;
					}
				}
			});

			return standings;
		} catch (err) {
			if (err.response.data.Code === 401) {
				const retryRes = await sportsApi.get(
					`/nhl/scores/json/Standings/${
						season.data.Season - 1
					}?key=${NHL_API_KEY_}`
				);
				let retry = retryRes.data;
				retry.forEach((item) => {
					for (let i = 0; i < nhlLogos.length; i++) {
						if (item.Key === nhlLogos[i].key) {
							item.Logo = nhlLogos[i].logoUrl;
						}
					}
				});
				return { code: err.response.data.Code, retryRes: retry };
			} else {
				return rejectWithValue(err.response.data);
			}
		}
	}
);

export const nhlAdapter = createEntityAdapter();
const initialState = nhlAdapter.getInitialState({
	loading: false,
	nhlTeam: null,
	nhlTeams: null,
	nhlNews: null,
	nhlPlayers: null,
	nhlStats: null,
	nhlStandings: null,
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
			.addCase(getNHLNews.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNHLNews.fulfilled, (state, action) => {
				state.loading = false;
				state.nhlNews = action.payload;
			})
			.addCase(getNHLNews.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getNHLFavTeamPlayers.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNHLFavTeamPlayers.fulfilled, (state, action) => {
				state.loading = false;
				state.nhlPlayers = action.payload;
			})
			.addCase(getNHLFavTeamPlayers.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getNHLTeamStats.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNHLTeamStats.fulfilled, (state, action) => {
				state.loading = false;
				state.nhlStats = action.payload;
			})
			.addCase(getNHLTeamStats.rejected, (state, action) => {
				state.loading = false;
				if (action.payload.code) {
					state.nhlStats = action.payload.retryRes;
				} else {
					state.errors = action.payload;
				}
			})
			.addCase(getNHLStandings.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNHLStandings.fulfilled, (state, action) => {
				state.loading = false;
				state.nhlStandings = action.payload;
			})
			.addCase(getNHLStandings.rejected, (state, action) => {
				state.loading = false;
				if (action.payload.code) {
					state.nhlStandings = action.payload.retryRes;
				} else {
					state.errors = action.payload;
				}
			})
			.addCase(clearNHLSlice, (state) => {
				nhlAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				nhlAdapter.removeAll(state);
				state.loading = false;
				state.nhlTeam = null;
				state.nhlTeams = null;
				state.nhlNews = null;
				state.nhlPlayers = null;
				state.nhlStats = null;
				state.nhlStandings = null;
				state.errors = null;
			});
	},
});

export const { clearNHLSlice } = nhlSlice.actions;

export default nhlSlice.reducer;
