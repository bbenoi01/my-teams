import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { NFL_API_KEY_ } from '@env';
import sportsApi from '../../api/sportsApi';

export const getNFLTeams = createAsyncThunk(
	'nfl/get_teams',
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

export const getNFLNews = createAsyncThunk(
	'nfl/get_news',
	async (nflData, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/nfl/scores/json/News?key=${NFL_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getNFLFavTeamPlayers = createAsyncThunk(
	'nfl/get_fav_team_players',
	async (team, { rejectWithValue }) => {
		try {
			const res = await sportsApi.get(
				`/nfl/scores/json/Players/${team}?key=${NFL_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getNFLTeamStats = createAsyncThunk(
	'nfl/get_team_stats',
	async (nflData, { rejectWithValue }) => {
		try {
			const season = await sportsApi.get(
				`/nfl/scores/json/CurrentSeason?key=${NFL_API_KEY_}`
			);
			const res = await sportsApi.get(
				`/nfl/scores/json/TeamSeasonStats/${season.data}?key=${NFL_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			if (err.response.data.Code === 401) {
				const retry = await sportsApi.get(
					`nfl/scores/json/TeamSeasonStats/${
						season.data - 1
					}?key=${NFL_API_KEY_}`
				);
				return { code: err.response.data.Code, retryRes: retry.data };
			} else {
				return rejectWithValue(err.response.data);
			}
		}
	}
);

export const getNFLStandings = createAsyncThunk(
	'nfl/get_standings',
	async (nflData, { rejectWithValue }) => {
		try {
			const season = await sportsApi.get(
				`/nfl/scores/json/CurrentSeason?key=${NFL_API_KEY_}`
			);
			const res = await sportsApi.get(
				`/nfl/scores/json/Standings/${season.data}?key=${NFL_API_KEY_}`
			);
			return res.data;
		} catch (err) {
			if (err.response.data.Code === 401) {
				const retry = await sportsApi.get(
					`/nfl/scores/json/Standings/${season.data - 1}?key=${NFL_API_KEY_}`
				);
				return { code: err.response.data.Code, retryRes: retry.data };
			} else {
				return rejectWithValue(err.response.data);
			}
		}
	}
);

export const getNFLSchedule = createAsyncThunk(
	'nfl/get_schedule',
	async (year, { rejectWithValue }) => {
		try {
			const scoreRes = await sportsApi.get(
				`/nfl/scores/JSON/Scores/${year}?key=${NFL_API_KEY_}`
			);
			const scheduleRes = await sportsApi.get(
				`/nfl/scores/JSON/Schedules/${year}?key=${NFL_API_KEY_}`
			);
			let scores = scoreRes.data;
			let schedule = scheduleRes.data;
			schedule.forEach((game) => {
				for (let i = 0; i < scores.length; i++) {
					if (game.GameKey === scores[i].GameKey) {
						game.HomeScore = scores[i].HomeScore;
						game.AwayScore = scores[i].AwayScore;
					}
				}
			});
			return schedule;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const nflAdapter = createEntityAdapter();
const initialState = nflAdapter.getInitialState({
	loading: false,
	year: '',
	nflTeam: null,
	nflTeams: null,
	nflNews: null,
	nflPlayers: null,
	nflStats: null,
	nflStandings: null,
	nflSchedule: [],
	errors: null,
});

export const nflSlice = createSlice({
	name: 'nfl',
	initialState,
	reducers: {
		setYear: (state, action) => {
			state.year = action.payload;
		},
		setNFLTeam: (state, action) => {
			state.nflTeam = action.payload;
		},
		clearNFLSlice: (state) => {
			state.loading = false;
			state.nflTeams = null;
			state.nflSchedule = [];
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
			.addCase(getNFLNews.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNFLNews.fulfilled, (state, action) => {
				state.loading = false;
				state.nflNews = action.payload;
			})
			.addCase(getNFLNews.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getNFLFavTeamPlayers.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNFLFavTeamPlayers.fulfilled, (state, action) => {
				state.loading = false;
				state.nflPlayers = action.payload;
			})
			.addCase(getNFLFavTeamPlayers.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getNFLTeamStats.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNFLTeamStats.fulfilled, (state, action) => {
				state.loading = false;
				state.nflStats = action.payload;
			})
			.addCase(getNFLTeamStats.rejected, (state, action) => {
				state.loading = false;
				if (action.payload.code) {
					state.nflStats = action.payload.retryRes;
				} else {
					state.errors = action.payload;
				}
			})
			.addCase(getNFLStandings.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNFLStandings.fulfilled, (state, action) => {
				state.loading = false;
				state.nflStandings = action.payload;
			})
			.addCase(getNFLStandings.rejected, (state, action) => {
				state.loading = false;
				if (action.payload.code) {
					state.nflStandings = action.payload.retryRes;
				} else {
					state.errors = action.payload;
				}
			})
			.addCase(getNFLSchedule.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getNFLSchedule.fulfilled, (state, action) => {
				state.loading = false;
				state.nflSchedule = action.payload.filter(
					(game) =>
						game.HomeTeam === state.nflTeam.split(', ')[1] ||
						game.AwayTeam === state.nflTeam.split(', ')[1]
				);
			})
			.addCase(getNFLSchedule.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(clearNFLSlice, (state) => {
				nflAdapter.removeAll(state);
			})
			.addCase(PURGE, (state) => {
				nflAdapter.removeAll(state);
				state.loading = false;
				state.nflTeam = null;
				state.nflTeams = null;
				state.nflNews = null;
				state.nflPlayers = null;
				state.nflStats = null;
				state.nflStandings = null;
				state.nflSchedule = [];
				state.errors = null;
			});
	},
});

export const { setYear, setNFLTeam, clearNFLSlice } = nflSlice.actions;

export default nflSlice.reducer;
