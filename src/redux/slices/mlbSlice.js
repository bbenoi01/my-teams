import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { MLB_API_KEY_ } from '@env';
import { mlbLogos } from '../../data';
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

export const getMLBNews = createAsyncThunk(
	'mlb/get_news',
	async (mlbData, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/mlb/scores/json/News?key=${MLB_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getMLBFavTeamPlayers = createAsyncThunk(
	'mlb/get_fav_team_players',
	async (team, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/mlb/scores/json/Players/${team}?key=${MLB_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getMLBTeamStats = createAsyncThunk(
	'mlb/get_team_stats',
	async (mlbData, { rejectWithValue }) => {
		try {
			const season = await sportsApi.get(
				`/mlb/scores/json/CurrentSeason?key=${MLB_API_KEY_}`
			);
			const statRes = await sportsApi.get(
				`/mlb/scores/json/TeamSeasonStats/${season.data.Season}?key=${MLB_API_KEY_}`
			);
			let stats = statRes.data;
			stats.forEach((item) => {
				for (let i = 0; i < mlbLogos.length; i++) {
					if (item.Team === mlbLogos[i].key) {
						item.Logo = mlbLogos[i].logoUrl;
					}
				}
			});

			return stats;
		} catch (err) {
			if (err.response.data.Code === 401) {
				const retryRes = await sportsApi.get(
					`/mlb/scores/json/TeamSeasonStats/${
						season.data.Season - 1
					}?key=${MLB_API_KEY_}`
				);
				let retry = retryRes.data;
				retry.forEach((item) => {
					for (let i = 0; i < mlbLogos.length; i++) {
						if (item.Team === mlbLogos[i].key) {
							item.Logo = mlbLogos[i].logoUrl;
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

export const getMLBStandings = createAsyncThunk(
	'mlb/get_standings',
	async (mlbData, { rejectWithValue }) => {
		try {
			const season = await sportsApi.get(
				`/mlb/scores/json/CurrentSeason?key=${MLB_API_KEY_}`
			);
			const standingsRes = await sportsApi.get(
				`/mlb/scores/json/Standings/${season.data.Season}?key=${MLB_API_KEY_}`
			);
			let standings = standingsRes.data;
			standings.forEach((item) => {
				for (let i = 0; i < mlbLogos.length; i++) {
					if (item.Key === mlbLogos[i].key) {
						item.Logo = mlbLogos[i].logoUrl;
					}
				}
			});

			return standings;
		} catch (err) {
			if (err.response.data.Code === 401) {
				const retryRes = await sportsApi.get(
					`/mlb/scores/json/Standings/${
						season.data.Season - 1
					}?key=${MLB_API_KEY_}`
				);
				let retry = retryRes.data;
				retry.forEach((item) => {
					for (let i = 0; i < mlbLogos.length; i++) {
						if (item.Key === mlbLogos[i].key) {
							item.Logo = mlbLogos[i].logoUrl;
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

export const getAllMLB = createAsyncThunk(
	'mlb/get_all',
	async (team, { rejectWithValue }) => {
		try {
			const newsRes = await sportsApi.get(
				`/mlb/scores/json/News?key=${MLB_API_KEY_}`
			);
			const playerRes = await sportsApi.get(
				`/mlb/scores/json/Players/${team}?key=${MLB_API_KEY_}`
			);
			const seasonRes = await sportsApi.get(
				`/mlb/scores/json/CurrentSeason?key=${MLB_API_KEY_}`
			);
			const season = seasonRes.data.Season;
			const statRes = await sportsApi.get(
				`/mlb/scores/json/TeamSeasonStats/${season}?key=${MLB_API_KEY_}`
			);
			const standingsRes = await sportsApi.get(
				`/mlb/scores/json/Standings/${season}?key=${MLB_API_KEY_}`
			);

			const news = newsRes.data;
			const players = playerRes.data;
			let stats = statRes.data;
			let standings = standingsRes.data;
			stats.forEach((item) => {
				for (let i = 0; i < mlbLogos.length; i++) {
					if (item.Team === mlbLogos[i].key) {
						item.Logo = mlbLogos[i].logoUrl;
					}
				}
			});
			standings.forEach((item) => {
				for (let i = 0; i < mlbLogos.length; i++) {
					if (item.Key === mlbLogos[i].key) {
						item.Logo = mlbLogos[i].logoUrl;
					}
				}
			});

			return { news, players, stats, standings };
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
	mlbNews: null,
	mlbPlayers: null,
	mlbStats: null,
	mlbStandings: null,
	mlbSchedule: [],
	errors: null,
});

export const mlbSlice = createSlice({
	name: 'mlb',
	initialState,
	reducers: {
		setMLBTeam: (state, action) => {
			state.mlbTeam = action.payload;
		},
		clearMLBSlice: (state) => {
			mlbAdapter.removeAll(state);
			state.loading = false;
			state.mlbTeam = null;
			state.mlbTeams = null;
			state.mlbNews = null;
			state.mlbPlayers = null;
			state.mlbStats = null;
			state.mlbStandings = null;
			state.errors = null;
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
			.addCase(getMLBNews.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getMLBNews.fulfilled, (state, action) => {
				state.loading = false;
				state.mlbNews = action.payload;
			})
			.addCase(getMLBNews.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getMLBFavTeamPlayers.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getMLBFavTeamPlayers.fulfilled, (state, action) => {
				state.loading = false;
				state.mlbPlayers = action.payload;
			})
			.addCase(getMLBFavTeamPlayers.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getMLBTeamStats.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getMLBTeamStats.fulfilled, (state, action) => {
				state.loading = false;
				state.mlbStats = action.payload;
			})
			.addCase(getMLBTeamStats.rejected, (state, action) => {
				state.loading = false;
				if (action.payload.code) {
					state.mlbStats = action.payload.retryRes;
				} else {
					state.errors = action.payload;
				}
			})
			.addCase(getMLBStandings.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getMLBStandings.fulfilled, (state, action) => {
				state.loading = false;
				state.mlbStandings = action.payload;
			})
			.addCase(getMLBStandings.rejected, (state, action) => {
				state.loading = false;
				if (action.payload.code) {
					state.mlbStandings = action.payload.retryRes;
				} else {
					state.errors = action.payload;
				}
			})
			.addCase(getAllMLB.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getAllMLB.fulfilled, (state, action) => {
				state.loading = false;
				state.mlbNews = action.payload.news;
				state.mlbPlayers = action.payload.players;
				state.mlbStats = action.payload.stats;
				state.mlbStandings = action.payload.standings;
			})
			.addCase(getAllMLB.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(PURGE, (state) => {
				mlbAdapter.removeAll(state);
				state.loading = false;
				state.mlbTeam = null;
				state.mlbTeams = null;
				state.mlbNews = null;
				state.mlbPlayers = null;
				state.mlbStats = null;
				state.mlbStandings = null;
				state.errors = null;
			});
	},
});

export const { setMLBTeam, clearMLBSlice } = mlbSlice.actions;

export default mlbSlice.reducer;
