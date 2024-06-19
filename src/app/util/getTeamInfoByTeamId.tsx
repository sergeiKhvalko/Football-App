import 'server-only'
import { oneTeam } from '@/types'
import getTeams from './getTeams'

export default async function getTeamInfoByTeamId(
	id: number,
): Promise<oneTeam | undefined> {
	try {
		const teams: oneTeam[] = await getTeams()

		for (const team of teams) {
			if (team.id === id) {
				return team
			}
		}

		return undefined
	} catch (err) {
		console.error('An Error occured while fetching team info by team Id: ', err)
		throw err
	}
}
