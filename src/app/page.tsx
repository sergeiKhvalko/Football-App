import { AllFixtures, Standing } from '@/types'
import StandingsAndFixtures from '@/src/app/components/home/StandingsAndFixtures'
import getFixturesForSevenLeagues from './util/getFixturesForSevenLeagues'
import getStandings from './util/getStandings'

export const revalidate = 60

export default async function Home() {
	const standingsData: Standing[] = await getStandings()
	const filteredFixtures: AllFixtures[] = await getFixturesForSevenLeagues()
	console.log(standingsData.length)
	console.log(filteredFixtures.length)

	if (!standingsData?.length || !filteredFixtures?.length) return null

	return (
		<main className="flex flex-col w-full justify-center items-center md:p-10">
			<StandingsAndFixtures
				standingsData={standingsData}
				filteredFixtures={filteredFixtures}
			/>
		</main>
	)
}
