import '@/styles/components/chartsList.scss'
import { useState, useMemo, useRef, useEffect } from 'react'
import { DataChart } from './DataChart'

export function ChartsList({ data }) {
	const experimentIds = useMemo(() => Object.keys(data), [data])
	const [selected, setSelected] = useState(new Set())
	const [search, setSearch] = useState('')
	const initializedRef = useRef(false)

	useEffect(() => {
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

	const filteredIds = experimentIds.filter(id => id.toLowerCase().includes(search.toLowerCase()))

	return (
		<div className='charts-list'>
			<p>Experiments list</p>

			<div className='charts-list__search'>
				<input
					type='text'
					className='charts-list__search-input'
					placeholder='Search experiments...'
					value={search}
					aria-label='search experiments'
					onChange={e => setSearch(e.target.value)}
				/>

				{search.length > 0 && (
					<button
						type='button'
						className='charts-list__search-clear'
						aria-label='clear search'
						onClick={() => setSearch('')}
					>
						×
					</button>
				)}
			</div>

			<div className='charts-list__nav'>
				{filteredIds.map(id => (
					<label key={id} className='charts-list__nav-item'>
						<input
							type='checkbox'
							checked={selected.has(id)}
							aria-label={`select experiment ${id}`}
							onChange={() => toggleExperiment(id)}
						/>

						<span>{id}</span>
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
