import Chart from 'react-apexcharts'

export function DataChart({ experimentId, metrics }) {
	const series = Object.entries(metrics).map(([metricName, points]) => ({
		name: metricName,
		data: points.map(p => [p.step, p.value]), // [x, y]
	}))

	const options = {
		chart: {
			type: 'line',
			zoom: { enabled: true },
			toolbar: { show: true },
		},
		responsive: [
			{
				breakpoint: 768,
				options: {
					chart: { width: '100%' },
				},
			},
		],
		xaxis: {
			type: 'numeric',
			title: { text: 'Step' },
		},
		yaxis: {
			title: { text: 'Value' },
		},
	}

	return (
		<div>
			<Chart options={options} series={series} type='line' height={350} width='100%' />
		</div>
	)
}
