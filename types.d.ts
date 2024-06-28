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
	statistics: {
		both_score: Matches
		corners: Matches
		individ_total: Matches
		productive_half: Matches
		total: Matches
		yellow_cards: Matches
	}
}

type Matches = {
	summary: Match
	home: Match
	away: Match
}

type Match = {
	match: Games
	first_half: Games
	second_half: Games
}

type Games = {
	played: number
	win: number
	draw: number
	lose: number
	goals_for: number
	goals_against: number
	goals_diff: number
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
}
