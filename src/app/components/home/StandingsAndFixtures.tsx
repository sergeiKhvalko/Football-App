'use client'
import {
	AllFixtures,
	oneTeam,
	Standing,
	Matches,
	Match,
	Statistics,
	StatMatches,
	StatMatch,
} from '@/types'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import FixturesByLeague from './FixturesByLeague'
import Image from 'next/image'
import moment from 'moment'
import { TemplateStat } from './TemplateStat'

export const StandingsAndFixtures = ({
	standingsData,
	filteredFixtures,
}: {
	standingsData: Standing[][]
	filteredFixtures: AllFixtures[]
}) => {
	console.log(standingsData)

	const currentTime = moment()
	const countSeasons = standingsData[0].length - 1
	const [year, setYear] = useState(0)
	const [activeTab, setActiveTab] = useState(0)
	const [activeTabYears, setActiveTabYears] = useState(countSeasons)
	const [tabMatch, setTabMatch] = useState<string>('summary')
	const [activeTabMatch, setActiveTabMatch] = useState(0)
	const [tabMatchStat, setTabMatchStat] = useState<string>('summary')
	const [activeTabMatchStat, setActiveTabMatchStat] = useState(0)
	const [tabHalf, setTabHalf] = useState<string>('match')
	const [activeTabHalf, setActiveTabHalf] = useState(0)
	const [tabHalfStat, setTabHalfStat] = useState<string>('match')
	const [activeTabHalfStat, setActiveTabHalfStat] = useState(0)
	const [tabStat, setTabStat] = useState('corners')
	const [activeTabStat, setActiveTabStat] = useState(0)
	const menuRef = useRef<HTMLDivElement>(null)
	const menuRefStat = useRef<HTMLDivElement>(null)

	console.log('46', tabStat)
	console.log('47', tabMatchStat)
	console.log('48', tabHalfStat)

	const scrollToTab = (index: number) => {
		const container = menuRef.current

		if (container) {
			const tab = container.children[index] as HTMLElement
			tab?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			})
		}
	}

	const scrollToTabStat = (index: number) => {
		const container = menuRefStat.current
		if (container) {
			const tab = container.children[index] as HTMLElement
			tab?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			})
		}
	}

	const handleTabClick = (index: number) => {
		setActiveTab(index)
		scrollToTab(index)
	}

	const handleTabClickStat = (index: number, name: string) => {
		if (name === 'productive_half') {
		}
		setTabStat(name)
		setActiveTabStat(index)
		scrollToTabStat(index)
	}

	const handleTabClickYear = (index: number, year: number) => {
		setYear(year)
		setActiveTabYears(index)
	}

	const handleTabClickMatch = (match: string, index: number) => {
		standingsData[activeTab][year].league.standings.sort(
			(a, b) =>
				b.matches[match as keyof Matches][tabHalf as keyof Match].points -
				a.matches[match as keyof Matches][tabHalf as keyof Match].points,
		)
		setTabMatch(match)
		setActiveTabMatch(index)
	}

	const handleTabClickMatchStat = (match: string, index: number) => {
		// standingsData[activeTab][year].league.standings.sort(
		// 	(a, b) =>
		// 		b.matches[match as keyof Matches][tabHalf as keyof Match].points -
		// 		a.matches[match as keyof Matches][tabHalf as keyof Match].points,
		// )
		setTabMatchStat(match)
		setActiveTabMatchStat(index)
	}

	const handleTabClickHalf = (half: string, index: number) => {
		standingsData[activeTab][year].league.standings.sort(
			(a, b) =>
				b.matches[tabMatch as keyof Matches][half as keyof Match].points -
				a.matches[tabMatch as keyof Matches][half as keyof Match].points,
		)
		setTabHalf(half)
		setActiveTabHalf(index)
	}

	const handleTabClickMatchHalf = (half: string, index: number) => {
		// standingsData[activeTab][year].league.standings.sort(
		// 	(a, b) =>
		// 		b.matches[tabMatch as keyof Matches][half as keyof Match].points -
		// 		a.matches[tabMatch as keyof Matches][half as keyof Match].points,
		// )
		setTabHalfStat(half)
		setActiveTabHalfStat(index)
	}

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			if (event.shiftKey) {
				event.preventDefault()
			}
		}

		const container = menuRef.current
		const containerStat = menuRefStat.current
		if (container) {
			container.addEventListener('wheel', handleWheel, { passive: false })
		}
		if (containerStat) {
			containerStat.addEventListener('wheel', handleWheel, { passive: false })
		}

		return () => {
			if (container) {
				container.removeEventListener('wheel', handleWheel)
			}
			if (containerStat) {
				containerStat.removeEventListener('wheel', handleWheel)
			}
		}
	}, [activeTab])

	return (
		<div className="flex flex-col w-full max-w-7xl bg-gradient-to-br from-sky-800/75 to-sky-800/25 lg:flex-row">
			<div className="flex flex-col justify-center items-center lg:w-3/5 md:p-10 py-5">
				<div className="flex flex-col justify-center items-center bg-gradient-to-b from-black/40 w-full text-neutral-100 rounded-3xl">
					<div className="flex flex-col w-full justify-center items-center">
						<div className="p-2 font-bold">STANDING</div>
						<div className="flex justify-start w-full gap-2 overflow-x-auto">
							{standingsData.map((item, i) => (
								<button
									key={i}
									className={`flex justify-center items-center shrink-0 p-4 rounded-lg bg-${
										item[year].league.flag
									}
								${i === activeTab ? 'opacity-100' : 'bg-black/100 opacity-50'}`}
									onClick={() => handleTabClick(i)}
								>
									<Image
										src={item[year].league.logo}
										alt="teamLogo"
										width={70}
										height={60}
									/>
								</button>
							))}
						</div>
						<div className="flex justify-center w-full gap-2">
							{standingsData[0]
								.map((item, index, array) => array[array.length - 1 - index])
								.map((season, j) => (
									<button
										key={j}
										className={`mt-3 w-full flex justify-center items-center p-4 rounded-t-lg bg-red
										${j === activeTabYears ? 'opacity-100' : 'bg-black/100 opacity-50'}`}
										onClick={() =>
											handleTabClickYear(
												j,
												currentTime.year() - 1 - season.league.season,
											)
										}
									>
										{season.league.season}
									</button>
								))}
						</div>
						<div className="flex self-start gap-2">
							{standingsData[0][0].league.standings[0].matches &&
								Object.keys(
									standingsData[0][0].league.standings[0].matches,
								).map((match, i) => (
									<div key={match + i}>
										<button
											className={`mt-3 w-full flex justify-center items-center p-4 rounded-t-lg bg-red
												${i === activeTabMatch ? 'opacity-100' : 'bg-black/100 opacity-50'}`}
											onClick={() => handleTabClickMatch(match, i)}
										>
											{match}
										</button>
									</div>
								))}
						</div>
						<div className="flex self-start gap-2">
							{standingsData[0][0].league.standings[0].matches.summary &&
								Object.keys(
									standingsData[0][0].league.standings[0].matches.summary,
								).map((half, i) => (
									<button
										key={half + i}
										className={`mt-3 w-full flex justify-center items-center p-4 rounded-t-lg bg-red
												${i === activeTabHalf ? 'opacity-100' : 'bg-black/100 opacity-50'}`}
										onClick={() => handleTabClickHalf(half, i)}
									>
										{half}
									</button>
								))}
						</div>
						<div
							ref={menuRef}
							className="flex w-full overflow-x-hidden snap-x scrollbar-none scroll-smooth text-xs md:text-base lg:text-lg"
						>
							{standingsData.map((responseData, i) => (
								<div
									key={i}
									className="flex flex-col justify-center items-center flex-shrink-0 w-full snap-center"
								>
									<div className="flex flex-col justify-between w-full p-2">
										<div className="flex w-full p-1">
											<div className="w-1/12"></div>
											<div className="w-3/12"></div>
											<div className="w-6/12 flex justify-evenly">
												<div className="w-full text-center">M</div>
												<div className="w-full text-center">W</div>
												<div className="w-full text-center">D</div>
												<div className="w-full text-center">L</div>
												<div className="w-full text-center font-bold">P</div>
												<div className="w-full text-center">GF</div>
												<div className="w-full text-center">GA</div>
												<div className="w-full text-center">GD</div>
											</div>
											<div className="w-2/12 text-center">Form</div>
										</div>
										{responseData[year].league.standings.length &&
											responseData[year].league.standings.map(
												(team: oneTeam, j) => (
													<Link
														href={`/team/${team.id}`}
														key={team.id}
														className={`flex w-full p-1 hover:bg-red-800/50
											${j % 2 === 0 ? 'bg-black/40' : ''}`}
													>
														<div className="flex justify-center items-center w-1/12 px-2">
															{j + 1}
														</div>
														<div className="flex items-center w-3/12 text-xs md:text-base lg:text-lg">
															{team.name}
														</div>
														<div className="flex justify-center items-center w-6/12">
															<div className="w-full text-center">
																{
																	team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	].played
																}
															</div>
															<div className="w-full text-center">
																{
																	team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	].win
																}
															</div>
															<div className="w-full text-center">
																{
																	team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	].draw
																}
															</div>
															<div className="w-full text-center">
																{
																	team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	].lose
																}
															</div>
															<div className="w-full text-center font-bold">
																{
																	team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	].points
																}
															</div>
															<div className="w-full text-center">
																{
																	team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	].goals_for
																}
															</div>
															<div className="w-full text-center">
																{
																	team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	].goals_against
																}
															</div>
															<div className="w-full text-center">
																{
																	team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	].goals_diff
																}
															</div>
														</div>
														<div className="w-2/12 flex justify-center items-center">
															{team.form.result
																?.split('')
																.slice(-5)
																.map((char, i) => (
																	<div
																		key={char + i}
																		title={team.form.info.slice(-5)[i]}
																		className={`opacity-80 w-5 h-5 m-[1px] flex justify-center items-center font-bold
                              ${
																char === 'L'
																	? 'bg-red-500'
																	: char === 'D'
																	? 'bg-gray-500'
																	: 'bg-green-500'
															}`}
																	>
																		{char}
																	</div>
																))}
														</div>
													</Link>
												),
											)}
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col w-full justify-center items-center">
						<div className="p-2 font-bold">STATICS STANDING</div>
						<div className="flex justify-start w-full gap-2 overflow-x-auto">
							{standingsData[activeTab][year].league.standings.length &&
								Object.keys(
									standingsData[activeTab][year].league.standings[0].statistics,
								).map((name, i) => (
									<button
										key={name + i}
										className={`flex justify-center items-center shrink-0 p-4 rounded-lg
								${i === activeTabStat ? 'opacity-100' : 'bg-black/100 opacity-50'}`}
										onClick={() => handleTabClickStat(i, name)}
									>
										<Image
											src={`/${name}.png`}
											alt={name}
											width={70}
											height={60}
										/>
									</button>
								))}
						</div>
						<div className="flex justify-center w-full gap-2">
							{standingsData[0]
								.map((item, index, array) => array[array.length - 1 - index])
								.map((season, j) => (
									<button
										key={j}
										className={`mt-3 w-full flex justify-center items-center p-4 rounded-t-lg bg-red
										${j === activeTabYears ? 'opacity-100' : 'bg-black/100 opacity-50'}`}
										onClick={() =>
											handleTabClickYear(
												j,
												currentTime.year() - 1 - season.league.season,
											)
										}
									>
										{season.league.season}
									</button>
								))}
						</div>
						<div className="flex self-start gap-2">
							{standingsData[0][0].league.standings[0].matches &&
								Object.keys(
									standingsData[0][0].league.standings[0].matches,
								).map((matchStat, i) => (
									<div key={matchStat + i}>
										<button
											className={`mt-3 w-full flex justify-center items-center p-4 rounded-t-lg bg-red
												${i === activeTabMatchStat ? 'opacity-100' : 'bg-black/100 opacity-50'}`}
											onClick={() => handleTabClickMatchStat(matchStat, i)}
										>
											{matchStat}
										</button>
									</div>
								))}
						</div>
						<div className="flex self-start gap-2">
							{standingsData[0][0].league.standings[0].statistics.corners
								.summary &&
								Object.keys(
									standingsData[0][0].league.standings[0].statistics.corners
										.summary,
								).map((halfStat, i) => (
									<button
										key={halfStat + i}
										className={`mt-3 w-full flex justify-center items-center p-4 rounded-t-lg bg-red
												${i === activeTabHalfStat ? 'opacity-100' : 'bg-black/100 opacity-50'}
												${tabStat === 'productive_half' ? 'hidden' : ''}`}
										onClick={() => handleTabClickMatchHalf(halfStat, i)}
										disabled={tabStat === 'productive_half'}
									>
										{halfStat}
									</button>
								))}
						</div>
						<div
							ref={menuRefStat}
							className="flex w-full overflow-x-hidden snap-x scrollbar-none scroll-smooth text-xs md:text-base lg:text-lg"
						>
							{standingsData[activeTab][year].league.standings.length &&
								Object.keys(
									standingsData[activeTab][year].league.standings[0].statistics,
								).map((stat: string, i) => (
									<div
										key={stat + i}
										className="flex flex-col justify-center items-center flex-shrink-0 w-full snap-center"
									>
										<div className="flex flex-col justify-between w-full p-2">
											<TemplateStat stat={stat} />
											{standingsData[activeTab][year].league.standings.length &&
												standingsData[activeTab][year].league.standings.map(
													(team: oneTeam, j) => (
														<Link
															href={`/team/${team.id}`}
															key={team.id}
															className={`flex w-full p-1 hover:bg-red-800/50
											${j % 2 === 0 ? 'bg-black/40' : ''}`}
														>
															<div className="flex justify-center items-center w-1/12 px-2">
																{j + 1}
															</div>
															<div className="flex items-center w-3/12 text-xs md:text-base lg:text-lg">
																{team.name}
															</div>
															<div className="flex justify-center items-center w-8/12">
																<div className="w-full text-center">
																	{tabStat !== 'productive_half'
																		? team.statistics[
																				tabStat as keyof Statistics
																		  ][tabMatchStat as keyof StatMatches][
																				tabHalfStat as keyof StatMatch
																		  ].matches
																		: team.statistics[
																				tabStat as keyof Statistics
																		  ][tabMatchStat as keyof StatMatches][
																				'match'
																		  ].matches}
																</div>
																{stat === 'corners' && (
																	<>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].corner_win
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].corner_draw
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].corner_lose
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].corner_under_8_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].corner_under_9_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].corner_over_9_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].corner_over_10_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].corner_over_11_5
																			}
																		</div>
																	</>
																)}
																{stat === 'yellow_cards' && (
																	<>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].yellow_win
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].yellow_draw
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].yellow_lose
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].yellow_under_2_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].yellow_under_3_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].yellow_over_3_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].yellow_over_4_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].yellow_over_5_5
																			}
																		</div>
																	</>
																)}
																{stat === 'total' && (
																	<>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].total_win
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].total_draw
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].total_lose
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].total_under_1_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].total_under_2_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].total_over_2_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].total_over_3_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].total_over_4_5
																			}
																		</div>
																	</>
																)}
																{stat === 'individ_total' && (
																	<>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].in_total_under_0_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].in_total_under_0_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].in_total_over_1_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].in_total_over_2_5
																			}
																		</div>
																	</>
																)}
																{stat === 'both_score' && (
																	<>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].bs_yes
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].bs_no
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].bs_win
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].bs_draw
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					tabHalf as keyof StatMatch
																				].bs_lose
																			}
																		</div>
																	</>
																)}
																{stat === 'productive_half' && (
																	<>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					'match'
																				].prod_first_over_second
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					'match'
																				].prod_first_equal_second
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatch as keyof StatMatches][
																					'match'
																				].prod_second_over_first
																			}
																		</div>
																	</>
																)}
															</div>
														</Link>
													),
												)}
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center lg:w-2/5 pt-10 lg:pr-10 pb-10 lg:pl-0">
				<div className="flex flex-col justify-center items-center bg-gradient-to-b from-black/40 w-full h-full text-neutral-100 rounded-3xl">
					<div className="w-full flex flex-col justify-center items-center">
						<div className="p-2 font-bold">Upcoming Matches</div>
						<div className="w-full h-[77vh] flex flex-col justify-start items-center pb-5 overflow-y-auto">
							{standingsData.map((leagueName, i) => {
								return (
									activeTab === i &&
									filteredFixtures.map((league, j) => {
										if (league.name === leagueName[year].league.name) {
											return (
												<FixturesByLeague
													fixturesData={league.fixtures}
													key={league.name + j}
												/>
											)
										}
									})
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
