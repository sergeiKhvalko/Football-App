import { Fixture } from '@/types'
import getFixtureByFixtureId from '@/src/app/util/getFixtureByFixtureId'
import Link from 'next/link'
import Image from 'next/image'
import LocalTime from '../../components/LocalTime'

type PageProps = {
	params: {
		id: string
	}
}

export default async function Match({ params }: PageProps) {
	const fixtureByFixtureId: Fixture | undefined = await getFixtureByFixtureId(
		parseInt(params.id),
	)

	if (!fixtureByFixtureId) {
		return (
			<div className="w-full flex justify-center items-center py-5">
				<div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
					No Fixture Info Available
				</div>
			</div>
		)
	}

	return (
		<div className="w-full flex flex-col justify-center items-center py-10 md:p-10 text-neutral-100">
			<div className="w-full max-w-7xl flex justify-center items-center perspective pb-20 md:pb-20">
				<div className="w-1/3 flex justify-center rounded-full animate-logo-pop-left logo-shadow">
					<Link href={`../team/${fixtureByFixtureId.teams.home.id}`}>
						<Image
							src={fixtureByFixtureId.teams.home.logo}
							alt="HomeLogoMatch"
							width={250}
							height={250}
						/>
					</Link>
				</div>
				<div className="w-1/3 flex flex-col justify-center items-center h-56">
					<div className="h-1/5 flex justify-center items-center text-sm md:text-xl text-center">
						<LocalTime fixture={fixtureByFixtureId} />
					</div>
					<div className="h-3/5 flex justify-center items-center text-2xl md:text-5xl">
						<div className="flex flex-col justify-center items-center">
							{fixtureByFixtureId.score.fulltime.home}
							{fixtureByFixtureId.score.penalty.home !== null ? (
								<div className="flex flex-col justify-center items-center text-sm">
									<div>(et. ) {fixtureByFixtureId.score.extratime.home}</div>
									<div>(pen. ) {fixtureByFixtureId.score.penalty.home}</div>
								</div>
							) : fixtureByFixtureId.score.extratime !== null ? (
								<div className="text-sm">
									(et .) {fixtureByFixtureId.score.extratime.home}
								</div>
							) : null}
						</div>
						<div>-</div>
						<div className="flex flex-col justify-center items-center">
							{fixtureByFixtureId.score.fulltime.away}
							{fixtureByFixtureId.score.penalty.away !== null ? (
								<div className="flex flex-col justify-center items-center text-sm">
									<div>(et. ) {fixtureByFixtureId.score.extratime.away}</div>
									<div>(pen. ) {fixtureByFixtureId.score.penalty.away}</div>
								</div>
							) : fixtureByFixtureId.score.extratime !== null ? (
								<div className="text-sm">
									(et .) {fixtureByFixtureId.score.extratime.away}
								</div>
							) : null}
						</div>
					</div>
					<div className="h-1/5 flex justify-center items-center"></div>
				</div>
				<div className="w-1/3 flex justify-center rounded-full animate-logo-pop-right logo-shadow">
					<Link href={`../team/${fixtureByFixtureId.teams.away.id}`}>
						<Image
							src={fixtureByFixtureId.teams.away.logo}
							alt="AwayLogoMatch"
							width={250}
							height={250}
						/>
					</Link>
				</div>
			</div>

			<div className="w-full flex flex-col justify-center items-center py-5 md:p-10 bg-gradient-to-b from-sky-800/60 to-sky-800/10">
				<div className="flex flex-col justify-center items-center p-2">
					<div>{fixtureByFixtureId.league.name}</div>
					<div>{fixtureByFixtureId.league.round}</div>
				</div>
				<div className="w-full flex justify-center items-center">
					<div className="w-1/2 flex flex-col justify-center items-center p-1">
						<div className="text-xl md:text-2xl text-center">
							{fixtureByFixtureId.teams.home.name}
						</div>
					</div>
					<div className="w-1/2 flex flex-col justify-center items-center p-1">
						<div className="text-xl md:text-2xl text-center">
							{fixtureByFixtureId.teams.away.name}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
