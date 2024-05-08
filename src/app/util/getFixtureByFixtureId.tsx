import { Fixture } from '@/types'
import getFixtures from './getFixtures'

export default async function getFixtureByFixtureId(
	id: number,
): Promise<Fixture | undefined> {
	try {
		const allFixturesByLeague = await getFixtures()

		for (const league of allFixturesByLeague) {
			for (const fixture of league.fixtures) {
				if (fixture.fixture.id === id) {
					return fixture
				}
			}
		}
		return undefined
	} catch (err) {
		console.error('Error occured while fetching fixture by fixture Id: ', err)
	}
}
