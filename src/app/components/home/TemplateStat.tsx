export const TemplateStat = ({ stat }: { stat: string }) => {
	switch (stat) {
		case 'corners':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-6/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">W</div>
						<div className="w-full text-center">D</div>
						<div className="w-full text-center">L</div>
						<div className="w-full text-center font-bold">C</div>
						<div className="w-full text-center">un8.5</div>
						<div className="w-full text-center">un9.5</div>
						<div className="w-full text-center">ov9.5</div>
						<div className="w-full text-center">ov10.5</div>
						<div className="w-full text-center">ov11.5</div>
					</div>
					<div className="w-2/12 text-center">Form</div>
				</div>
			)
		case 'yellow_cards':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-6/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">W</div>
						<div className="w-full text-center">D</div>
						<div className="w-full text-center">L</div>
						<div className="w-full text-center font-bold">C</div>
						<div className="w-full text-center">un2.5</div>
						<div className="w-full text-center">un3.5</div>
						<div className="w-full text-center">ov3.5</div>
						<div className="w-full text-center">ov4.5</div>
						<div className="w-full text-center">ov5.5</div>
					</div>
					<div className="w-2/12 text-center">Form</div>
				</div>
			)
		case 'total':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-6/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">W+T.ov2.5</div>
						<div className="w-full text-center">D+T.ov2.5</div>
						<div className="w-full text-center">L+T.ov2.5</div>
						<div className="w-full text-center">un2.5</div>
						<div className="w-full text-center">un3.5</div>
						<div className="w-full text-center">ov3.5</div>
						<div className="w-full text-center">ov4.5</div>
						<div className="w-full text-center">ov5.5</div>
					</div>
					<div className="w-2/12 text-center">Form</div>
				</div>
			)
		case 'individ_total':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-6/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">un0_5</div>
						<div className="w-full text-center">un1_5</div>
						<div className="w-full text-center">ov1_5</div>
						<div className="w-full text-center">ov2_5</div>
					</div>
					<div className="w-2/12 text-center">Form</div>
				</div>
			)
		case 'both_score':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-6/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">W+BS</div>
						<div className="w-full text-center">D+BS</div>
						<div className="w-full text-center">L+BS</div>
						<div className="w-full text-center font-bold">C</div>
						<div className="w-full text-center">yes</div>
						<div className="w-full text-center">no</div>
					</div>
					<div className="w-2/12 text-center">Form</div>
				</div>
			)
		case 'productive_half':
			return (
				<div className="flex w-full p-1">
					<div className="w-1/12"></div>
					<div className="w-3/12"></div>
					<div className="w-6/12 flex justify-evenly">
						<div className="w-full text-center">M</div>
						<div className="w-full text-center">1ov2</div>
						<div className="w-full text-center">1eq2</div>
						<div className="w-full text-center">2ov1</div>
					</div>
					<div className="w-2/12 text-center">Form</div>
				</div>
			)
		default:
			return <></>
	}
}
