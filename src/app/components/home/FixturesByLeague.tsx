import { Fixture } from '@/types'
import FixtureItem from './FixtureItem'

type FixturesByLeagueProps = {
	fixturesData: Fixture[]
}

export default function FixturesByLeague({
	fixturesData,
}: FixturesByLeagueProps): any {
	return fixturesData.length > 0
		? fixturesData.map((match, i) => {
				return <FixtureItem match={match} index={i} key={match.fixture.id} />
		  })
		: null
}
