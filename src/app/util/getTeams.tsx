import { oneTeam, Standing, StandingLeagues } from '@/types'
import getStandings from './getStanding'
import moment from 'moment'

// export default async function getTeams(): Promise<oneTeam[]> {
// 	try {
// 		const standings: Standing[][] = await getStandings()
// 		const teams: oneTeam[] = []

// 		for (const seasons of standings) {
// 			if (seasons[0]) {
// 				for (const team of seasons[0].league.standings) {
// 					teams.push(team)
// 				}
// 			}
// 		}
// 		return teams
// 	} catch (error) {
// 		console.error('Error occured while fetching teams: ', error)
// 		throw error
// 	}
// }
