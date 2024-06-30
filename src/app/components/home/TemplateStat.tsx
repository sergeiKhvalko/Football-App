export const TemplateStat = ({ stat }: { stat: string }) => {
	switch (stat) {
		case 'corners':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-8/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">W</div>
						<div className="w-full text-center">D</div>
						<div className="w-full text-center">L</div>
						<div className="w-full text-center">u8.5</div>
						<div className="w-full text-center">u9.5</div>
						<div className="w-full text-center">o9.5</div>
						<div className="w-full text-center">o10.5</div>
						<div className="w-full text-center">o11.5</div>
					</div>
				</div>
			)
		case 'yellow_cards':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-8/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">W</div>
						<div className="w-full text-center">D</div>
						<div className="w-full text-center">L</div>
						<div className="w-full text-center">u2.5</div>
						<div className="w-full text-center">u3.5</div>
						<div className="w-full text-center">o3.5</div>
						<div className="w-full text-center">o4.5</div>
						<div className="w-full text-center">o5.5</div>
					</div>
				</div>
			)
		case 'total':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-8/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">W</div>
						<div className="w-full text-center">D</div>
						<div className="w-full text-center">L</div>
						<div className="w-full text-center">u1.5</div>
						<div className="w-full text-center">u2.5</div>
						<div className="w-full text-center">o2.5</div>
						<div className="w-full text-center">o3.5</div>
						<div className="w-full text-center">o4.5</div>
					</div>
				</div>
			)
		case 'individ_total':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-8/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">u0_5</div>
						<div className="w-full text-center">u1_5</div>
						<div className="w-full text-center">o1_5</div>
						<div className="w-full text-center">o2_5</div>
					</div>
				</div>
			)
		case 'both_score':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-8/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">yes</div>
						<div className="w-full text-center">no</div>
						<div className="w-full text-center">W+BS</div>
						<div className="w-full text-center">D+BS</div>
						<div className="w-full text-center">L+BS</div>
					</div>
				</div>
			)
		case 'productive_half':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-8/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">1ov2</div>
						<div className="w-full text-center">1eq2</div>
						<div className="w-full text-center">2ov1</div>
					</div>
				</div>
			)
		default:
			return <></>
	}
}
