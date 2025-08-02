import '@/styles/components/Chart.scss'
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
			foreColor: '#fff',
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
			title: {
				text: 'Step',
				style: {
					color: '#fff',
					fontSize: '18px',
					fontWeight: 600,
				},
			},
			labels: {
				style: {
					colors: '#fff',
					fontSize: '14px',
				},
			},
		},
		yaxis: {
			title: {
				text: 'Value',
				style: {
					color: '#fff',
					fontSize: '18px',
					fontWeight: 600,
				},
			},
			labels: {
				style: {
					colors: '#fff',
					fontSize: '14px',
				},
				formatter: value => value.toFixed(2),
			},
		},
		tooltip: {
			theme: 'dark',
			y: {
				formatter: value => value.toFixed(2),
			},
		},
		legend: {
			labels: {
				colors: '#fff',
			},
			fontSize: '16px',
			fontWeight: 500,
		},
	}

	return (
		<div className='chart'>
			<h2 className='chart__title'>{experimentId}</h2>
			<Chart options={options} series={series} type='line' height={350} width='100%' />
		</div>
	)
}
