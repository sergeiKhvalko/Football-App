import { Fixture, oneTeam } from '@/types'
import getTeamInfoByTeamId from '@/src/app/util/getTeamInfoByTeamId'
import getFixturesByTeamId from '@/src/app/util/getFixturesByTeamId'
import Image from 'next/image'
import Fixtures from './components/Fixtures'

type PageProps = {
	params: {
		id: string
	}
}

export default async function Team({ params }: PageProps) {
	const teamInfo: oneTeam | undefined = await getTeamInfoByTeamId(
		parseInt(params.id),
	)
	const fixturesByTeamId: Fixture[] = await getFixturesByTeamId(
		parseInt(params.id),
	)
	if (!teamInfo) {
		return (
			<div className="w-full flex justify-center items-center py-5">
				<div className="w-full max-w-7xl flex justify-center items-center p-5 md:flex-row text-neutral-100">
					Team Info Not Available
				</div>
			</div>
		)
	}

	return (
		<div className="flex justify-center items-center text-neutral-100 py-5">
			<div className="flex flex-col max-w-7xl p-5 w-full md:flex-row">
				<div
					className="flex flex-col md:w-1/3 justify-center items-center
                bg-gradient-to-r from-black/60 to-sky-800/80 h-[500px]"
				>
					{/* <Image
						src={teamInfo.logo}
						alt="TeamLogo"
						width={150}
						height={150}
						className="p-3"
					/> */}
					<div className="text-2xl">{teamInfo.name}</div>
					<div className="flex justify-center items-center w-full">
						{/* <div className="w-1/3 text-center text-2xl">#{teamInfo.rank}</div>
						<div className="w-1/3 text-center">{teamInfo.group}</div> */}
						<div className="w-1/3 flex flex-col justify-center items-center">
							<div className="text-center">Form</div>
							<div className="flex justify-center items-center">
								{teamInfo.form.result
									.split('')
									.slice(-5)
									.map((char, i) => (
										<div
											key={char + i}
											className={`opacity-80 w-3 h-3 lg:w-4 lg:h-4 m-1 font-bold
											${char === 'L' ? 'bg-red-500' : char === 'D' ? 'bg-gray-500' : 'bg-green-500'}`}
										/>
									))}
							</div>
						</div>
					</div>
					<div className="flex flex-col w-full p-2 mt-10">
						<div className="flex w-full justify-center items-center text-xl">
							<div className="w-full text-center font-bold">P</div>
							<div className="w-full text-center">M</div>
							<div className="w-full text-center">W</div>
							<div className="w-full text-center">D</div>
							<div className="w-full text-center">L</div>
							<div className="w-full text-center">GF</div>
							<div className="w-full text-center">GA</div>
							<div className="w-full text-center">GD</div>
						</div>
						<div className="flex w-full justify-center items-center text-xl">
							<div className="w-full text-center font-bold">
								{teamInfo.points}
							</div>
							<div className="w-full text-center">{teamInfo.all.played}</div>
							<div className="w-full text-center">{teamInfo.all.win}</div>
							<div className="w-full text-center">{teamInfo.all.draw}</div>
							<div className="w-full text-center">{teamInfo.all.lose}</div>
							<div className="w-full text-center">{teamInfo.all.goals_for}</div>
							<div className="w-full text-center">
								{teamInfo.all.goals_against}
							</div>
							<div className="w-full text-center">
								{teamInfo.all.goals_diff}
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:w-2/3 justify-center items-center">
					<Fixtures
						fixturesByTeamId={fixturesByTeamId}
						teamId={parseInt(params.id)}
					/>
				</div>
			</div>
		</div>
	)
}
