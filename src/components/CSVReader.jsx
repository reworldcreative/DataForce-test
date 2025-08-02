import '@/styles/components/uploadFile.scss'
import { useRef, useState } from 'react'
import { DataChart } from './DataChart'

export function CsvReader() {
	const [data, setData] = useState({})
	const [isDragging, setIsDragging] = useState(false)
	const inputRef = useRef(null)

	const handleFile = file => {
		const reader = new FileReader()
		reader.onload = event => {
			const text = event.target?.result
			const rows = text.split('\n').filter(Boolean)
			const headers = rows[0].split(',')

			const parsed = rows.slice(1).map(row => {
				const values = row.split(',')
				const obj = {}
				headers.forEach((header, i) => {
					obj[header.trim()] = values[i]?.trim()
				})
				return obj
			})

			const structured = {}

			for (const row of parsed) {
				const experimentId = row.experiment_id
				const metric = row.metric_name
				const step = Number(row.step)
				const value = Number(row.value)

				if (!structured[experimentId]) structured[experimentId] = {}
				if (!structured[experimentId][metric]) structured[experimentId][metric] = []

				structured[experimentId][metric].push({ step, value })
			}

			const targetExperimentId = 'exp_1'
			setData(structured[targetExperimentId] ? { [targetExperimentId]: structured[targetExperimentId] } : {})
		}
		reader.readAsText(file)
	}

	const handleFileChange = e => {
		const file = e.target.files?.[0]
		if (file) handleFile(file)
	}

	const handleDrop = e => {
		e.preventDefault()
		setIsDragging(false)
		if (e.dataTransfer.files?.length > 0) {
			handleFile(e.dataTransfer.files[0])
		}
	}

	const handleDragOver = e => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => setIsDragging(false)

	const handleClick = () => inputRef.current?.click()

	return (
		<>
			<div
				className='upload-file'
				role='button'
				tabIndex={0}
				onClick={handleClick}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
			>
				<input
					className='upload-file__input'
					type='file'
					accept='.csv'
					aria-label='Upload CSV'
					ref={inputRef}
					onChange={handleFileChange}
				/>

				<p className='text-gray-600'>
					{isDragging ? 'Відпусти файл тут' : 'Перетягни CSV сюди або натисни, щоб завантажити'}
				</p>
			</div>

			<div>
				{Object.entries(data).map(([experimentId, metrics]) => (
					<DataChart key={experimentId} experimentId={experimentId} metrics={metrics} />
				))}
			</div>
		</>
	)
}
