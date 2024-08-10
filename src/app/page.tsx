import { AllFixtures, oneTeam, Standing } from '@/types'
import { StandingsAndFixtures } from '@/src/app/components/home/StandingsAndFixtures'
import getFixturesForLeagues from './util/getFixturesForLeagues'
import getStandings from './util/getStandings'

export const revalidate = 60

export default async function Home() {
	// const [standingsData, filteredFixtures] = await Promise.all([await getStandings(), await getFixturesForLeagues()])
	const standingsData: Standing[][] = await getStandings()
	const filteredFixtures: AllFixtures[] = await getFixturesForLeagues()
	const standingsDataStat: Standing[][] = JSON.parse(
		JSON.stringify(standingsData),
	)

	standingsDataStat[0][0]?.league?.standings?.sort(
		(a: oneTeam, b: oneTeam) =>
			b.statistics['corners']['summary']['match'].corner_over_9_5 -
			a.statistics['corners']['summary']['match'].corner_over_9_5,
	)

	// if (!standingsData?.length || !filteredFixtures?.length) return null

	return (
		<main className="flex flex-col w-full justify-center items-center md:p-10">
			<StandingsAndFixtures
				standingsData={standingsData}
				filteredFixtures={filteredFixtures}
				standingsDataStat={standingsDataStat}
			/>
		</main>
	)
}
