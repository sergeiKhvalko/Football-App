'use client'

import { Fixture } from '@/types'
import moment from 'moment'
import { useEffect, useState } from 'react'

type LocalTimeProps = {
	fixture: Fixture
}

export default function LocalTime({ fixture }: LocalTimeProps) {
	const [formattedTime, setFormattedTime] = useState('')

	useEffect(() => {
		function formatToLocalTime(timeUTC: string) {
			const newTime = moment(timeUTC)
			const localDateString = newTime.format('dddd, LL')
			const localTimeString = newTime.format('LT')
			return `${localDateString} ${localTimeString}`
		}

		const fixtureTime = fixture.fixture.date
		const formatted = formatToLocalTime(fixtureTime)
		setFormattedTime(formatted)
	}, [])
	return (
		<div className="flex justify-center items-center text-center">
			{formattedTime}
		</div>
	)
}
