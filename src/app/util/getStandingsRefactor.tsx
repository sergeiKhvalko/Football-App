import { Standing } from '@/types'
import moment from 'moment'
import { epl2024 } from '../data/epl2024'

export default async function getStandings(): Promise<Standing[][]> {
	const currentTime = moment()
	const month = currentTime.month()
	let year: number

	if (month < 6) {
		year = currentTime.year() - 1
	} else {
		year = currentTime.year()
	}

	const standings: Standing[][] = []
	// const standings: any = []

	const leagues = [
		{ name: 'RPL', id: 235 },
		{ name: 'FNL', id: 236 },
		{ name: 'EPL', id: 39 },
		// { name: 'Championship', id: 40 },
		// { name: 'BundesLiga', id: 78 },
		{ name: '2BundesLiga', id: 79 },
		// { name: 'Serie A', id: 135 },
		// { name: 'Serie B', id: 136 },
		// { name: 'La Liga', id: 140 },
		// { name: 'Segunda', id: 141 },
		// { name: 'Ligue1', id: 61 },
		// { name: 'Ligue2', id: 62 },
		// { name: 'Primeira', id: 94 },
		// { name: 'Eredivisie', id: 88 },
		// { name: 'Belgium', id: 144 },
		// { name: 'Turkey', id: 203 },
		// { name: 'Switzerland', id: 207 },
		// { name: 'Argentina', id: 128 },
		// { name: 'Brazil', id: 71 },
	]
	for (let league of leagues) {
		// const seasons: Standing[] = []
		const seasons: any = []
		const url = `${process.env.DOMAIN}/standings?season=${year}&league=${league.id}`

		try {
			const response = await fetch(url)
			const data = await response.json()
			if (year === 2024 && league.id === 39) {
				seasons.push(epl2024[0])
			} else {
				seasons.push(data.response[0])
			}
		} catch (err) {
			console.error(`Error fetching ${league.name} standings: ${err}`)
		}
		standings.push(seasons)
	}

	return standings
}
