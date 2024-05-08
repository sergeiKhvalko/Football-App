'use client'

import { Fixture } from '@/types'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import LocalTime from '../LocalTime'

type FixtureItemProps = {
	match: Fixture
	index: number
}

export default function FixtureItem({ match, index }: FixtureItemProps) {
	const today = moment()
	const matchDate = moment(match.fixture.date)

	return today.isBefore(matchDate) ? (
		<Link
			href={`/match/${match.fixture.id}`}
			key={match.fixture.id}
			className={`flex w-full p-2 justify-center items-center h-36 hover:bg-cyan-800/50
            ${index % 2 === 0 ? 'bg-black/40' : ''} animated-div`}
		>
			<div className="w-1/3 flex flex-col justify-center items-center text-center">
				<Image
					src={match.teams.home.logo}
					alt="HomeLogo"
					width={70}
					height={70}
				/>
				{match.teams.home.name}
			</div>
			<div className="w-1/3 flex flex-col justify-center items-center h-full">
				<div className="h-2/4 text-center text-xs md:text-base">
					<LocalTime fixture={match} />
				</div>
				<div className="h-1/4 text-center text-xs md:text-base">vs</div>
				<div className="h-1/4"></div>
			</div>
			<div className="w-1/3 flex flex-col justify-center items-center text-center">
				<Image
					src={match.teams.away.logo}
					alt="HomeLogo"
					width={70}
					height={70}
				/>
				{match.teams.away.name}
			</div>
		</Link>
	) : null
}
