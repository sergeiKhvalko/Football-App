import { Standing } from '@/types'

export default async function getStanding(
	leagueName: string,
	leagueId: number,
	year: number,
): Promise<Standing[]> {
	const standing: Standing[] = []
	// const url = `${process.env.DOMAIN}/standings?season=${year}&league=${leagueId}`
	const url = `https://sergeikhvalko-football-app-back-fd5d.twc1.net/standings?season=${year}&league=${leagueId}`

	try {
		const response = await fetch(url)
		const data = await response.json()

		standing.push(data.response[0])
	} catch (err) {
		console.error(`Error fetching ${leagueName} standings: ${err}`)
	}

	return standing
}
