import '@/styles/components/Chart.scss'
import { useEffect, useRef, useState } from 'react'
import Chart from 'react-apexcharts'
import gsap from 'gsap'

export function DataChart({ experimentId, metrics }) {
	const [isReady, setIsReady] = useState(false)
	const chartRef = useRef(null)

	useEffect(() => {
		setIsReady(false)
		const timeout = setTimeout(() => setIsReady(true), 300)
		return () => clearTimeout(timeout)
	}, [metrics])

	useEffect(() => {
		if (isReady && chartRef.current) {
			gsap.fromTo(
				chartRef.current,
				{ opacity: 0, scale: 0.95 },
				{ opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
			)
		}
	}, [isReady])

	const series = Object.entries(metrics).map(([metricName, points]) => ({
		name: metricName,
		data: points.map(p => [p.step, p.value]),
	}))

	const allSteps = series.flatMap(s => s.data.map(point => point[0]))
	const sortedSteps = [...new Set(allSteps)].sort((a, b) => a - b)
	const maxStep = sortedSteps.length > 100 ? sortedSteps[99] : sortedSteps[sortedSteps.length - 1]

	const options = {
		chart: {
			type: 'line',
			zoom: {
				enabled: true,
				type: 'x',
				autoScaleYaxis: true,
			},
			toolbar: { show: true },
			foreColor: '#fff',
			animations: { enabled: false },
			dataLabels: { enabled: false },
			defaultRenderer: 'canvas',
		},
		stroke: {
			curve: 'smooth',
			width: 1,
		},
		xaxis: {
			type: 'numeric',
			min: 0,
			max: maxStep,
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

			{!isReady ? (
				<div className='chart-loading'>
					<div className='spinner' />
					<p>Loading chart...</p>
				</div>
			) : (
				<div ref={chartRef}>
					<Chart options={options} series={series} type='line' height={350} width='100%' />
				</div>
			)}
		</div>
	)
}
