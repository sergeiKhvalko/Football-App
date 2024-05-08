import { oneTeam, Standing } from '@/types'
import getStandings from './getStandings'

export default async function getTeams(): Promise<oneTeam[]> {
	try {
		const standings: Standing[] = await getStandings()
		const teams: oneTeam[] = []

		for (const league of standings) {
			if (league.league) {
				for (const standing of league.league.standings) {
					if (Array.isArray(standing)) {
						for (const team of standing) {
							teams.push(team)
						}
					} else {
						throw new Error('Invalid standings data')
					}
				}
			}
		}

		return teams
	} catch (error) {
		console.error('Error occured while fetching teams: ', error)
		throw error
	}
}
