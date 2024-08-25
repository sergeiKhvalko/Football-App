export default async function getMatchesForMatchweek(
	seasonId: number,
	leagueId: number,
	matchweek: number,
) {
	const url = `http://127.0.0.1:8000/api/matches?season=${2023}&league=${leagueId}&matchweek=${matchweek}`

	try {
		const response = await fetch(url)

		const data = await response.json()
		console.log(data)
		return data
	} catch (err) {
		console.error(`Error fetching ${leagueId} matches: ${err}, url---${url}`)
	}
}
