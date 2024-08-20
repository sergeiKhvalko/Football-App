interface StandingLeagues {
	[key: number]: Standing
}

type Standing = {
	league: League
}

type League = {
	id: number
	country: string
	flag: string
	name: string
	logo: string
	season: number
	standings: oneTeam[]
}

type oneTeam = {
	id: number
	name: string
	matches: Matches
	points: number
	form: {
		result: string
		info: Array<string>
	}
	statistics: Statistics
}
type Statistics = {
	corners: StatMatches
	individ_corners: StatMatches
	yellow_cards: StatMatches
	individ_yellow_cards: StatMatches
	total: StatMatches
	individ_total: StatMatches
	both_score: StatMatches
	productive_half: StatMatches
	individ_productive_half: StatMatches
}

type Matches = {
	summary: Match
	home: Match
	away: Match
}

type StatMatches = {
	summary: StatMatch
	home: StatMatch
	away: StatMatch
}

type Match = {
	match: Games
	first_half: Games
	second_half: Games
}

type StatMatch = {
	match: Stat
	first_half: Stat
	second_half: Stat
}

type Stat = {
	matches: number
	corner_count: number
	corner_win: number
	corner_draw: number
	corner_lose: number
	corner_under_2_5: number
	corner_under_3_5: number
	corner_under_4_5: number
	corner_under_5_5: number
	corner_under_6_5: number
	corner_under_7_5: number
	corner_under_8_5: number
	corner_under_9_5: number
	corner_over_4_5: number
	corner_over_5_5: number
	corner_over_6_5: number
	corner_over_7_5: number
	corner_over_8_5: number
	corner_over_9_5: number
	corner_over_10_5: number
	corner_over_11_5: number
	yellow_count: number
	yellow_win: number
	yellow_draw: number
	yellow_lose: number
	yellow_under_0_5: number
	yellow_under_1_5: number
	yellow_under_2_5: number
	yellow_under_3_5: number
	yellow_over_1_5: number
	yellow_over_2_5: number
	yellow_over_3_5: number
	yellow_over_4_5: number
	yellow_over_5_5: number
	total_count: number
	total_win: number
	total_draw: number
	total_lose: number
	total_under_0_5: number
	total_under_1_5: number
	total_under_2_5: number
	total_over_0_5: number
	total_over_1_5: number
	total_over_2_5: number
	total_over_3_5: number
	total_over_4_5: number
	in_total_count: number
	in_total_under_0_5: number
	in_total_under_1_5: number
	in_total_over_1_5: number
	in_total_over_2_5: number
	bs_count: number
	bs_yes: number
	bs_no: number
	bs_win: number
	bs_draw: number
	bs_lose: number
	prod_count: number
	first_over_second: number
	first_equal_second: number
	second_over_first: number
}

type Games = {
	played: number
	win: number
	draw: number
	lose: number
	goals_for: number
	goals_against: number
	goals_diff: number
	points: number
}

// Fixtures

type FixtureInfo = {
	id: number
	referee: string
	timezone: string
	date: string
	timestamp: number
	periods: {
		fisrt: number
		second: number
	}
	venue: {
		id: number
		name: string
		city: string
	}
	status: {
		long: string
		short: string
		elapsed: number
	}
}

type LeagueFixtures = {
	id: number
	name: string
	country: string
	logo: string
	flag: string
	season: number
	round: string
}

type Teams = {
	home: {
		id: number
		name: string
		logo: string
		winner: boolean
	}
	away: {
		id: number
		name: string
		logo: string
		winner: boolean
	}
}

type Goals = {
	home: number
	away: number
}

type Score = {
	halftime: Goals
	fulltime: Goals
	extratime: Goals
	penalty: Goals
}

type Fixture = {
	fixture: FixtureInfo
	league: LeagueFixtures
	teams: Teams
	goals: Goals
	score: Score
}

type AllFixtures = {
	name: string
	fixtures: Fixture[]
}

export {
	StandingLeagues,
	Standing,
	oneTeam,
	AllFixtures,
	Fixture,
	Matches,
	Match,
	Statistics,
	StatMatches,
	StatMatch,
}
