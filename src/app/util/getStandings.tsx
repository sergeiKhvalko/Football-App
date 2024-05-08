import { Standing } from '@/types'
import moment from 'moment'

export default async function getStandings(): Promise<Standing[]> {
	const currentTime = moment()
	const month = currentTime.month()
	let year

	if (month <= 6) {
		year = currentTime.year() - 1
	} else {
		year = currentTime.year()
	}

	const API_KEY: string = process.env.API_KEY as string

	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': API_KEY,
			'x-rapidapi-host': 'v3.football.api-sports.io',
		},
		// next: {
		// 	revalidate: 60 * 60 * 24,
		// },
	}

	const standings: Standing[] = []

	const leagues = [
		{ name: 'RPL', id: 235 },
		{ name: 'EPL', id: 39 },
		// { name: 'Championship', id: 40 },
		{ name: 'BundesLiga', id: 78 },
		{ name: 'Serie A', id: 135 },
		{ name: 'La Liga', id: 140 },
		{ name: 'Ligue1', id: 61 },
	]

	for (let league of leagues) {
		const url = `https://v3.football.api-sports.io/standings?season=${year}&league=${league.id}`

		try {
			const response = await fetch(url, options)
			const data = await response.json()

			const standing = data.response[0] || {}

			standings.push(standing)
		} catch (err) {
			console.error(`Error fetching ${league.name} standings: ${err}`)
		}
	}

	return standings
}
