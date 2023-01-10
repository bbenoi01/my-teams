import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { NBA_API_KEY_ } from '@env';
import { nbaLogos } from '../../data';
import sportsApi from '../../api/sportsApi';

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

export const getNBANews = createAsyncThunk(
	'nba/get_news',
	async (nbaData, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/nba/scores/json/News?key=${NBA_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getNBAFavTeamPlayers = createAsyncThunk(
	'nba/get_fav_team_players',
	async (team, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/nba/scores/json/Players/${team}?key=${NBA_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getNBATeamStats = createAsyncThunk(
	'nba/get_team_stats',
	async (nbaData, { rejectWithValue }) => {
		try {
			const season = await sportsApi.get(
				`/nba/scores/json/CurrentSeason?key=${NBA_API_KEY_}`
			);
			const statRes = await sportsApi.get(
				`/nba/scores/json/TeamSeasonStats/${season.data.Season}?key=${NBA_API_KEY_}`
			);
			let stats = statRes.data;
			stats.forEach((item) => {
				for (let i = 0; i < nbaLogos.length; i++) {
					if (item.Team === nbaLogos[i].key) {
						item.Logo = nbaLogos[i].logoUrl;
					}
				}
			});

			return stats;
		} catch (err) {
			if (err.response.data.Code === 401) {
				const retryRes = await sportsApi.get(
					`/nba/scores/json/TeamSeasonStats/${
						season.data.Season - 1
					}?key=${NBA_API_KEY_}`
				);
				let retry = retryRes.data;
				retry.forEach((item) => {
					for (let i = 0; i < nbaLogos.length; i++) {
						if (item.Team === nbaLogos[i].key) {
							item.Logo = nbaLogos[i].logoUrl;
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

export const getNBAStandings = createAsyncThunk(
	'nba/get_standings',
	async (nbaData, { rejectWithValue }) => {
		try {
			const season = await sportsApi.get(
				`/nba/scores/json/CurrentSeason?key=${NBA_API_KEY_}`
			);
			const standingsRes = await sportsApi.get(
				`/nba/scores/json/Standings/${season.data.Season}?key=${NBA_API_KEY_}`
			);
			let standings = standingsRes.data;
			standings.forEach((item) => {
				for (let i = 0; i < nbaLogos.length; i++) {
					if (item.Key === nbaLogos[i].key) {
						item.Logo = nbaLogos[i].logoUrl;
					}
				}
			});

			return standings;
		} catch (err) {
			if (err.response.data.Code === 401) {
				const retryRes = await sportsApi.get(
					`/nba/scores/json/Standings/${
						season.data.Season - 1
					}?key=${NBA_API_KEY_}`
				);
				let retry = retryRes.data;
				retry.forEach((item) => {
					for (let i = 0; i < nbaLogos.length; i++) {
						if (item.Team === nbaLogos[i].key) {
							item.Logo = nbaLogos[i].logoUrl;
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

export const getAllNBA = createAsyncThunk(
	'nba/get_all',
	async (team, { rejectWithValue }) => {
		try {
			const newsRes = await sportsApi.get(
				`/nba/scores/json/News?key=${NBA_API_KEY_}`
			);
			const playerRes = await sportsApi.get(
				`/nba/scores/json/Players/${team}?key=${NBA_API_KEY_}`
			);
			const season = await sportsApi.get(
				`/nba/scores/json/CurrentSeason?key=${NBA_API_KEY_}`
			);
			const statRes = await sportsApi.get(
				`/nba/scores/json/TeamSeasonStats/${season.data.Season}?key=${NBA_API_KEY_}`
			);
			const standingsRes = await sportsApi.get(
				`/nba/scores/json/Standings/${season.data.Season}?key=${NBA_API_KEY_}`
			);

			const news = newsRes.data;
			const players = playerRes.data;
			let stats = statRes.data;
			let standings = standingsRes.data;
			stats.forEach((item) => {
				for (let i = 0; i < nbaLogos.length; i++) {
					if (item.Team === nbaLogos[i].key) {
						item.Logo = nbaLogos[i].logoUrl;
					}
				}
			});
			standings.forEach((item) => {
				for (let i = 0; i < nbaLogos.length; i++) {
					if (item.Key === nbaLogos[i].key) {
						item.Logo = nbaLogos[i].logoUrl;
					}
				}
			});

			return { news, players, stats, standings };
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getNBASchedule = createAsyncThunk(
	'nba/get_schedule',
	async (scheduleData, { rejectWithValue }) => {
		try {
			const scheduleRes = await sportsApi.get(
				`/nba/scores/json/Games/${scheduleData.year}?key=${NBA_API_KEY_}`
			);
			const schedule = scheduleRes.data.filter(
				(item) =>
					item.AwayTeam === scheduleData.team ||
					item.HomeTeam === scheduleData.team
			);

			return schedule;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const nbaAdapter = createEntityAdapter();
const initialState = nbaAdapter.getInitialState({
	loading: false,
	nbaTeam: null,
	nbaTeams: null,
	nbaNews: null,
	nbaPlayers: null,
	nbaStats: null,
	nbaStandings: null,
	nbaSchedule: [],
	errors: null,
});

export const nbaSlice = createSlice({
	name: 'nba',
	initialState,
	reducers: {
		setNBATeam: (state, action) => {
			state.nbaTeam = action.payload;
		},
		clearNBASlice: (state) => {
			nbaAdapter.removeAll(state);
			state.loading = false;
			state.nbaTeam = null;
			state.nbaTeams = null;
			state.nbaNews = null;
			state.nbaPlayers = null;
			state.nbaStats = null;
			state.nbaStandings = null;
			state.errors = null;
		},
	},
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
			})
			.addCase(getNBANews.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNBANews.fulfilled, (state, action) => {
				state.loading = false;
				state.nbaNews = action.payload;
			})
			.addCase(getNBANews.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getNBAFavTeamPlayers.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNBAFavTeamPlayers.fulfilled, (state, action) => {
				state.loading = false;
				state.nbaPlayers = action.payload;
			})
			.addCase(getNBAFavTeamPlayers.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getNBATeamStats.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNBATeamStats.fulfilled, (state, action) => {
				state.loading = false;
				state.nbaStats = action.payload;
			})
			.addCase(getNBATeamStats.rejected, (state, action) => {
				state.loading = false;
				if (action.payload.code) {
					state.nbaStats = action.payload.retryRes;
				} else {
					state.errors = action.payload;
				}
			})
			.addCase(getNBAStandings.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNBAStandings.fulfilled, (state, action) => {
				state.loading = false;
				state.nbaStandings = action.payload;
			})
			.addCase(getNBAStandings.rejected, (state, action) => {
				state.loading = false;
				if (action.payload.code) {
					state.nbaStandings = action.payload.retryRes;
				} else {
					state.errors = action.payload;
				}
			})
			.addCase(getAllNBA.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getAllNBA.fulfilled, (state, action) => {
				state.loading = false;
				state.nbaNews = action.payload.news;
				state.nbaPlayers = action.payload.players;
				state.nbaStats = action.payload.stats;
				state.nbaStandings = action.payload.standings;
			})
			.addCase(getAllNBA.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(PURGE, (state) => {
				nbaAdapter.removeAll(state);
				state.loading = false;
				state.nbaTeam = null;
				state.nbaTeams = null;
				state.nbaNews = null;
				state.nbaPlayers = null;
				state.nbaStats = null;
				state.nbaStandings = null;
				state.errors = null;
			});
	},
});

export const { setNBATeam, clearNBASlice } = nbaSlice.actions;

export default nbaSlice.reducer;
