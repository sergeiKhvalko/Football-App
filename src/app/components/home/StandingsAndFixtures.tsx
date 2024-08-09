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
import { useEffect, useRef, useState, useLayoutEffect, memo } from 'react'
import FixturesByLeague from './FixturesByLeague'
import Image from 'next/image'
import moment from 'moment'
import { TemplateStat } from './TemplateStat'
import styles from './StandingsAndFixtures.module.scss'
import { shortTeamNames } from '../../data/shortTeamNames'
import { v4 as uuid } from 'uuid'
import getStanding from '../../util/getStanding'

export const StandingsAndFixtures = memo(
	({
		initStandingsData,
		filteredFixtures,
		standingsDataStat,
	}: {
		initStandingsData: Standing[][]
		filteredFixtures: AllFixtures[]
		standingsDataStat: Standing[][]
	}) => {
		console.log('33-----standingsData', initStandingsData)

		const currentYear = moment().year()
		const allSeasons = [2019, 2020, 2021, 2022, 2023, 2024]

		const [standingsData, setInitStandingsData] =
			useState<Standing[][]>(initStandingsData)
		const [isLoading, setIsLoading] = useState<boolean>(false)
		const [activeTabLeague, setActiveTabLeague] = useState<number>(0)
		const [yearSeason, setYearSeason] = useState<number>(
			allSeasons[allSeasons.length - 1],
		)
		const [activeTabSeason, setActiveTabSeason] = useState<number>(
			allSeasons.length - 1,
		)

		const [tabMatch, setTabMatch] = useState<string>('summary')
		const [activeTabMatch, setActiveTabMatch] = useState<number>(0)
		const [tabMatchStat, setTabMatchStat] = useState<string>('summary')
		const [activeTabMatchStat, setActiveTabMatchStat] = useState<number>(0)

		const [tabHalf, setTabHalf] = useState<string>('match')
		const [activeTabHalf, setActiveTabHalf] = useState<number>(0)
		const [tabHalfStat, setTabHalfStat] = useState<string>('match')
		const [activeTabHalfStat, setActiveTabHalfStat] = useState<number>(0)

		const [tabStat, setTabStat] = useState<string>('corners')
		const [activeTabStat, setActiveTabStat] = useState<number>(0)

		const menuRef = useRef<HTMLDivElement>(null)
		const menuRefStat = useRef<HTMLDivElement>(null)

		const sortStats = (
			statName: string,
			match: string,
			half: string,
			activeTab: number,
			year: number,
		) => {
			if (statName === 'corners') {
				if (half === 'match') {
					standingsDataStat[activeTab][year].league.standings.sort(
						(a: oneTeam, b: oneTeam) =>
							b.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].corner_over_9_5 -
							a.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].corner_over_9_5,
					)
				} else {
					standingsDataStat[activeTab][year].league.standings.sort(
						(a: oneTeam, b: oneTeam) =>
							b.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].corner_over_4_5 -
							a.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].corner_over_4_5,
					)
				}
			} else if (statName === 'yellow_cards') {
				if (half === 'match') {
					standingsDataStat[activeTab][year].league.standings.sort(
						(a: oneTeam, b: oneTeam) =>
							b.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].yellow_over_4_5 -
							a.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].yellow_over_4_5,
					)
				} else {
					standingsDataStat[activeTab][year].league.standings.sort(
						(a: oneTeam, b: oneTeam) =>
							b.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].yellow_over_2_5 -
							a.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].yellow_over_2_5,
					)
				}
			} else if (statName === 'total') {
				if (half === 'match') {
					standingsDataStat[activeTab][year].league.standings.sort(
						(a: oneTeam, b: oneTeam) =>
							b.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].total_over_2_5 -
							a.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].total_over_2_5,
					)
				} else {
					standingsDataStat[activeTab][year].league.standings.sort(
						(a: oneTeam, b: oneTeam) =>
							b.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].total_over_1_5 -
							a.statistics[statName as keyof Statistics][
								match as keyof Matches
							][half as keyof Match].total_over_1_5,
					)
				}
			} else if (statName === 'individ_total') {
				standingsDataStat[activeTab][year].league.standings.sort(
					(a: oneTeam, b: oneTeam) =>
						b.statistics[statName as keyof Statistics][match as keyof Matches][
							half as keyof Match
						].in_total_over_1_5 -
						a.statistics[statName as keyof Statistics][match as keyof Matches][
							half as keyof Match
						].in_total_over_1_5,
				)
			} else if (statName === 'both_score') {
				standingsDataStat[activeTab][year].league.standings.sort(
					(a: oneTeam, b: oneTeam) =>
						b.statistics[statName as keyof Statistics][match as keyof Matches][
							half as keyof Match
						].bs_yes -
						a.statistics[statName as keyof Statistics][match as keyof Matches][
							half as keyof Match
						].bs_yes,
				)
			} else if (statName === 'productive_half') {
				standingsDataStat[activeTab][year].league.standings.sort(
					(a: oneTeam, b: oneTeam) =>
						b.statistics[statName as keyof Statistics][match as keyof Matches][
							'match'
						].second_over_first -
						a.statistics[statName as keyof Statistics][match as keyof Matches][
							'match'
						].second_over_first,
				)
			}
		}

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
			// sortStats(
			// 	tabStat,
			// 	tabMatchStat,
			// 	tabHalfStat,
			// 	index,
			// 	currentYear - yearSeason,
			// )
			if (!standingsData[index][currentYear - yearSeason]) {
				setIsLoading(true)
			}
			setActiveTabLeague(index)
			scrollToTab(index)
		}

		const handleTabClickStat = (index: number, name: string) => {
			console.log(index)
			console.log(name)

			sortStats(
				name,
				tabMatchStat,
				tabHalfStat,
				activeTabLeague,
				currentYear - yearSeason,
			)
			if (name === 'productive_half') {
				setTabHalf('match')
			}
			setTabStat(name)
			setActiveTabStat(index)
			scrollToTabStat(index)
		}

		const handleTabClickSeason = (index: number, season: number) => {
			if (!standingsData[activeTabLeague][currentYear - season]) {
				setIsLoading(true)
			}
			setActiveTabSeason(index)
			setYearSeason(season)
		}

		const handleTabClickMatch = (match: string, index: number) => {
			standingsData[activeTabLeague][
				currentYear - yearSeason
			].league.standings.sort(
				(a, b) =>
					b.matches[match as keyof Matches][tabHalf as keyof Match].points -
					a.matches[match as keyof Matches][tabHalf as keyof Match].points,
			)
			setTabMatch(match)
			setActiveTabMatch(index)
		}

		const handleTabClickMatchStat = (
			match: string,
			tabStat: string,
			index: number,
		) => {
			sortStats(
				tabStat,
				match,
				tabHalfStat,
				activeTabLeague,
				currentYear - yearSeason,
			)
			setTabMatchStat(match)
			setActiveTabMatchStat(index)
		}

		const handleMouseLeave = (name: string) => {
			if (name === 'productive_half') {
				// setTabHalfStat('match')
				// setActiveTabHalfStat(0)
			}
		}

		const handleTabClickHalf = (half: string, index: number) => {
			standingsData[activeTabLeague][
				currentYear - yearSeason
			].league.standings.sort(
				(a, b) =>
					b.matches[tabMatch as keyof Matches][half as keyof Match].points -
					a.matches[tabMatch as keyof Matches][half as keyof Match].points,
			)
			setTabHalf(half)
			setActiveTabHalf(index)
		}

		const handleTabClickHalfStat = (
			tabStat: string,
			tabMatchStat: string,
			half: string,
			index: number,
		) => {
			sortStats(
				tabStat,
				tabMatchStat,
				half,
				activeTabLeague,
				currentYear - yearSeason,
			)
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
		}, [activeTabLeague])

		const fetchSeasonForLeague = async () => {
			const res = await getStanding(
				standingsData[activeTabLeague][0].league.name,
				standingsData[activeTabLeague][0].league.id,
				yearSeason,
			)
			return res[0]
		}

		useEffect(() => {
			const fetchSeason = () => {
				if (!standingsData[activeTabLeague][currentYear - yearSeason]) {
					fetchSeasonForLeague().then((res: Standing) => {
						if (!res) {
							fetchSeason()
						} else {
							setInitStandingsData((standingsData) => {
								standingsData[activeTabLeague][currentYear - yearSeason] = res
								standingsDataStat[activeTabLeague][currentYear - yearSeason] =
									JSON.parse(JSON.stringify(res))
								sortStats(
									tabStat,
									tabMatchStat,
									tabHalfStat,
									activeTabLeague,
									currentYear - yearSeason,
								)
								return standingsData
							})
							setIsLoading(false)
						}
					})
				}
				handleTabClick(activeTabLeague)
			}

			fetchSeason()
		}, [yearSeason, activeTabLeague])

		// useEffect(() => {
		// 	scrollToTab(activeTabLeague)
		// }, [activeTabLeague])

		return (
			<div className="flex flex-col w-full max-w-7xl bg-gradient-to-br from-sky-800/75 to-sky-800/25 lg:flex-row lg:items-start">
				<div className="flex flex-col justify-center items-center px-2 lg:w-3/5 md:p-10 py-5">
					<div className="flex flex-col justify-center items-center px-2 bg-gradient-to-b from-black/40 w-full text-neutral-100 rounded-3xl">
						<div className="flex flex-col w-full justify-center items-center">
							<div className="p-2 font-bold">STANDING</div>
							<div className="flex justify-start w-full gap-2 overflow-x-auto">
								{standingsData.map((item, i) => (
									<button
										key={uuid()}
										className={`flex justify-center items-center shrink-0 p-4 rounded-lg bg-${
											item[0] && item[0].league?.flag
										}
								${i === activeTabLeague ? 'opacity-100' : 'bg-black/100 opacity-50'}`}
										onClick={() => handleTabClick(i)}
									>
										<Image
											src={item[0] ? item[0].league?.logo : ''}
											alt="teamLogo"
											width={70}
											height={60}
										/>
									</button>
								))}
							</div>
							<div className="flex justify-center w-full gap-2">
								{allSeasons.map((season, i) => (
									<button
										key={uuid()}
										className={`mt-3 w-full flex justify-center items-center p-2 rounded-[8px]
										${i === activeTabSeason ? 'opacity-100 bg-red-800' : 'bg-gray-950 opacity-50'}`}
										onClick={() => handleTabClickSeason(i, season)}
										disabled={isLoading}
									>
										{season}
									</button>
								))}
							</div>

							<div className="flex self-start gap-2">
								{standingsData[0][0].league?.standings[0].matches &&
									Object.keys(
										standingsData[0][0].league?.standings[0].matches,
									).map((match, i) => (
										<button
											key={uuid()}
											className={`mt-3 w-full flex justify-center items-center p-2 rounded-[8px] text-lg font-bold
										${
											i === activeTabMatch
												? 'opacity-100 border-b-4 border-red-800'
												: 'opacity-30'
										}`}
											onClick={() => handleTabClickMatch(match, i)}
										>
											{match}
										</button>
									))}
							</div>
							<div className="flex self-start gap-2">
								{standingsData[0][0] &&
									standingsData[0][0].league?.standings[0].matches.summary &&
									Object.keys(
										standingsData[0][0].league.standings[0].matches.summary,
									).map((half, i) => (
										<button
											key={uuid()}
											className={`mt-3 w-full flex justify-center items-center p-2 rounded-[8px] text-lg font-bold whitespace-nowrap
										${
											i === activeTabHalf
												? 'opacity-100 border-b-4 border-red-800'
												: 'opacity-30'
										}`}
											onClick={() => handleTabClickHalf(half, i)}
										>
											{half.replace('_', ' ')}
										</button>
									))}
							</div>
							<div
								ref={menuRef}
								className="flex w-full overflow-x-hidden snap-x scrollbar-none scroll-smooth text-xs md:text-base lg:text-lg"
							>
								{standingsData.map((responseData, i) => (
									<div
										key={uuid()}
										className="flex flex-col justify-center items-center flex-shrink-0 w-full snap-center"
									>
										{isLoading ? (
											'Loading...'
										) : (
											<div className="flex flex-col justify-between w-full py-2">
												<div className="flex w-full p-1">
													<div className="w-1/12"></div>
													<div className="w-3/12"></div>
													<div className="w-6/12 flex justify-evenly">
														<div className="w-full text-center">M</div>
														<div className="w-full text-center">W</div>
														<div className="w-full text-center">D</div>
														<div className="w-full text-center">L</div>
														<div className="w-full text-center font-bold">
															P
														</div>
														<div className="w-full text-center">GF</div>
														<div className="w-full text-center">GA</div>
														<div className="w-full text-center">GD</div>
													</div>
													<div className="w-2/12 text-center">Form</div>
												</div>
												{responseData[currentYear - yearSeason]?.league
													?.standings?.length &&
													responseData[
														currentYear - yearSeason
													].league.standings.map((team: oneTeam, j) => (
														<Link
															href={`/team/${team.id}`}
															key={uuid()}
															className={`flex w-full p-1 hover:bg-red-800/50
											${j % 2 === 0 ? 'bg-black/40' : ''}`}
														>
															<div className="flex justify-center items-center w-1/12 px-2">
																{j + 1}
															</div>
															<div className="flex items-center w-3/12 text-xs md:text-base lg:text-lg">
																{shortTeamNames[team.name]}
															</div>
															<div className="flex justify-center items-center w-6/12">
																<div className="w-full text-center">
																	{team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	]
																		? team.matches[tabMatch as keyof Matches][
																				tabHalf as keyof Match
																		  ].played
																		: 0}
																</div>
																<div className="w-full text-center">
																	{team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	]
																		? team.matches[tabMatch as keyof Matches][
																				tabHalf as keyof Match
																		  ].win
																		: 0}
																</div>
																<div className="w-full text-center">
																	{team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	]
																		? team.matches[tabMatch as keyof Matches][
																				tabHalf as keyof Match
																		  ].draw
																		: 0}
																</div>
																<div className="w-full text-center">
																	{team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	]
																		? team.matches[tabMatch as keyof Matches][
																				tabHalf as keyof Match
																		  ].lose
																		: 0}
																</div>
																<div className="w-full text-center font-bold">
																	{team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	]
																		? team.matches[tabMatch as keyof Matches][
																				tabHalf as keyof Match
																		  ].points
																		: 0}
																</div>
																<div className="w-full text-center">
																	{team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	]
																		? team.matches[tabMatch as keyof Matches][
																				tabHalf as keyof Match
																		  ].goals_for
																		: 0}
																</div>
																<div className="w-full text-center">
																	{team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	]
																		? team.matches[tabMatch as keyof Matches][
																				tabHalf as keyof Match
																		  ].goals_against
																		: 0}
																</div>
																<div className="w-full text-center">
																	{team.matches[tabMatch as keyof Matches][
																		tabHalf as keyof Match
																	]
																		? team.matches[tabMatch as keyof Matches][
																				tabHalf as keyof Match
																		  ].goals_diff
																		: 0}
																</div>
															</div>
															<div className="w-2/12 flex justify-center items-center">
																{team.form &&
																	team.form.result
																		?.split('')
																		.slice(-5)
																		.map((char, i) => (
																			<div
																				key={uuid()}
																				title={team.form.info.slice(-5)[i]}
																				className={`opacity-80 w-3 h-3 m-[1px] flex justify-center items-center font-bold sm:w-5 sm:h-5
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
													))}
											</div>
										)}
									</div>
								))}
							</div>
						</div>

						<div className="flex flex-col w-full justify-center items-center">
							<div className="p-2 font-bold">STATISTICS STANDING</div>
							<div className="flex justify-start w-full gap-2 overflow-auto">
								{standingsData[activeTabLeague][currentYear - yearSeason] &&
									Object.keys(
										standingsData[activeTabLeague][currentYear - yearSeason]
											.league.standings[0].statistics,
									).map((name, i) => (
										<button
											key={uuid()}
											className={`flex justify-center items-center shrink-0 p-4 rounded-lg
								${i === activeTabStat ? 'opacity-100' : 'bg-black/100 opacity-50'}
								${styles.statsBtn}
								`}
											onClick={() => handleTabClickStat(i, name)}
											onMouseOver={() => handleMouseLeave(name)}
										>
											<Image
												src={`/${name}.png`}
												alt={name}
												width={70}
												height={60}
											/>
											<span className={styles.statsTooltip}>
												{name.replace('_', ' ')}
											</span>
										</button>
									))}
							</div>
							<div className="flex justify-center w-full gap-2">
								{allSeasons.map((season, i) => (
									<button
										key={uuid()}
										className={`mt-3 w-full flex justify-center items-center p-2 rounded-[8px]
										${i === activeTabSeason ? 'opacity-100 bg-red-800' : 'bg-gray-950 opacity-50'}`}
										onClick={() => handleTabClickSeason(i, season)}
										disabled={isLoading}
									>
										{season}
									</button>
								))}
							</div>
							<div className="flex self-start gap-2">
								{standingsData[0][0].league.standings[0].matches &&
									Object.keys(
										standingsData[0][0].league.standings[0].matches,
									).map((matchStat, i) => (
										<div key={uuid()}>
											<button
												className={`mt-3 w-full flex justify-center items-center p-2 rounded-[8px] text-lg font-bold
										${
											i === activeTabMatchStat
												? 'opacity-100 border-b-4 border-red-800'
												: 'opacity-30'
										}`}
												onClick={() =>
													handleTabClickMatchStat(matchStat, tabStat, i)
												}
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
											key={uuid()}
											className={`mt-3 w-full flex justify-center items-center p-2 rounded-[8px] text-lg font-bold whitespace-nowrap
										${
											i === activeTabHalfStat
												? 'opacity-100 border-b-4 border-red-800'
												: 'opacity-30'
										}
												${tabStat === 'productive_half' ? 'hidden' : ''}`}
											onClick={() =>
												handleTabClickHalfStat(
													tabStat,
													tabMatchStat,
													halfStat,
													i,
												)
											}
											disabled={tabStat === 'productive_half'}
										>
											{halfStat.replace('_', ' ')}
										</button>
									))}
							</div>
							<div
								ref={menuRefStat}
								className="flex w-full overflow-x-hidden snap-x scrollbar-none scroll-smooth text-xs md:text-base lg:text-lg"
							>
								{standingsDataStat[activeTabLeague][currentYear - yearSeason] &&
									Object.keys(
										standingsDataStat[activeTabLeague][currentYear - yearSeason]
											.league.standings[0].statistics,
									).map((stat: string, i) => (
										<div
											key={uuid()}
											className="flex flex-col justify-center items-center flex-shrink-0 w-full snap-center"
										>
											<div className="flex flex-col justify-between w-full py-2">
												<TemplateStat stat={stat} half={tabHalfStat} />
												{standingsDataStat[activeTabLeague][
													currentYear - yearSeason
												].league.standings.length &&
													standingsDataStat[activeTabLeague][
														currentYear - yearSeason
													].league.standings.map((team: oneTeam, j: number) => (
														<Link
															href={`/team/${team.id}`}
															key={uuid()}
															className={`flex w-full p-1 hover:bg-red-800/50
											${j % 2 === 0 ? 'bg-black/40' : ''}`}
														>
															<div className="flex justify-center items-center w-1/12 px-2">
																{j + 1}
															</div>
															<div className="flex items-center w-3/12 text-xs md:text-base lg:text-lg">
																{shortTeamNames[team.name]}
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
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_under_8_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_under_3_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_under_9_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_under_4_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_over_9_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_over_4_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_over_10_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_over_5_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_over_11_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].corner_over_6_5}
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
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_under_2_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_under_0_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_under_3_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_under_1_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_over_3_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_over_1_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_over_4_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_over_2_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_over_5_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].yellow_over_3_5}
																		</div>
																	</>
																)}
																{stat === 'total' && (
																	<>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].total_win
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].total_draw
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].total_lose
																			}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_under_1_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_under_0_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_under_2_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_under_1_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_over_2_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_over_0_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_over_3_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_over_1_5}
																		</div>
																		<div className="w-full text-center">
																			{tabHalfStat === 'match'
																				? team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_over_4_5
																				: team.statistics[
																						tabStat as keyof Statistics
																				  ][tabMatchStat as keyof StatMatches][
																						tabHalfStat as keyof StatMatch
																				  ].total_over_2_5}
																		</div>
																	</>
																)}
																{stat === 'individ_total' && (
																	<>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].in_total_under_0_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].in_total_under_1_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].in_total_over_1_5
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
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
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].bs_yes
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].bs_no
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].bs_win
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
																				].bs_draw
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					tabHalfStat as keyof StatMatch
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
																				][tabMatchStat as keyof StatMatches][
																					'match'
																				].first_over_second
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					'match'
																				].first_equal_second
																			}
																		</div>
																		<div className="w-full text-center">
																			{
																				team.statistics[
																					tabStat as keyof Statistics
																				][tabMatchStat as keyof StatMatches][
																					'match'
																				].second_over_first
																			}
																		</div>
																	</>
																)}
															</div>
														</Link>
													))}
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-center items-center px-2 lg:w-2/5 pt-10 lg:pr-10 pb-10 lg:pl-0">
					<div className="flex flex-col justify-start items-center bg-gradient-to-b from-black/40 w-full h-full text-neutral-100 rounded-3xl">
						<div className="w-full flex flex-col justify-start items-center">
							<div className="p-2 font-bold">Upcoming Matches</div>
							<div className="w-full h-[180vh] flex flex-col justify-start items-center pb-5 overflow-y-auto">
								{standingsData.map((leagueName, i) => {
									return (
										activeTabLeague === i &&
										filteredFixtures.map((league, j) => {
											if (league.name === leagueName[0].league.name) {
												return (
													<FixturesByLeague
														fixturesData={league.fixtures}
														key={uuid()}
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
	},
)
