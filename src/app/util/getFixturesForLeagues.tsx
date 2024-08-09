import moment from 'moment'
import { AllFixtures } from '@/types'
import getFixtures from './getFixtures'

export default async function getFixturesForLeagues(): Promise<AllFixtures[]> {
	try {
		const allFixturesByLeague = await getFixtures()

		const fixturesLeague: AllFixtures[] = []
		for (const league of allFixturesByLeague) {
			if (
				league.name === 'RPL'
				// league.name === 'FNL' ||
				// league.name === 'Premier League' ||
				// league.name === 'Championship' ||
				// league.name === 'BundesLiga' ||
				// league.name === 'Serie A' ||
				// league.name === 'La Liga' ||
				// league.name === 'Ligue1'
			) {
				fixturesLeague.push(league)
			}
		}

		const filteredFixtures: AllFixtures[] = fixturesLeague.filter((league) => {
			league.fixtures = league.fixtures
				.filter((fixture) => {
					return moment(fixture.fixture.date).isAfter(
						moment().subtract(1, 'day'),
						'day',
					)
				})
				.slice(0, 20)
			return league.fixtures.length > 0
		})

		return filteredFixtures
	} catch (error) {
		console.error('An error occured while fetching fixtures: ', error)
		throw error
	}
}
