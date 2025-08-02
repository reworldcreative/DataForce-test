import { useState, useMemo, useRef, useEffect } from 'react'
import { DataChart } from './DataChart'
import '@/styles/components/chartsList.scss'

export function ChartsList({ data }) {
	const experimentIds = useMemo(() => Object.keys(data), [data])
	const [selected, setSelected] = useState(new Set())

	// ✅ прапорець, чи вже ініціалізовано перший вибір
	const initializedRef = useRef(false)

	useEffect(() => {
		// зробити вибраним перший, якщо ще не було ініціалізації і є дані
		if (!initializedRef.current && experimentIds.length > 0) {
			setSelected(new Set([experimentIds[0]]))
			initializedRef.current = true
		}
	}, [experimentIds])

	const toggleExperiment = id => {
		const newSelected = new Set(selected)
		if (newSelected.has(id)) {
			newSelected.delete(id)
		} else {
			newSelected.add(id)
		}
		setSelected(newSelected)
	}

	return (
		<div className='charts-list'>
			<div className='charts-list__nav'>
				{experimentIds.map(id => (
					<label key={id}>
						<input
							type='checkbox'
							checked={selected.has(id)}
							aria-label={`select experiment ${id}`}
							onChange={() => toggleExperiment(id)}
						/>
						{id}
					</label>
				))}
			</div>

			<div className='charts'>
				{experimentIds
					.filter(id => selected.has(id))
					.map(id => (
						<DataChart key={id} experimentId={id} metrics={data[id]} />
					))}
			</div>
		</div>
	)
}
