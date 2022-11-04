import {useState} from 'react'

export const usePermanentToggle = <T>(defaultValue: T, finalValue: T) => {
	const [value, setValue] = useState(defaultValue)

	const toggle = () => setValue(finalValue)

	return [value, toggle]
}