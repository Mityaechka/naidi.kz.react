import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {Location} from 'react-router-dom'

export const useRouteChange = () => {
	const [currentLocation, setLocation] = useState<Location>()

	const location = useLocation()
	useEffect(() => {
		setLocation(location)
	}, [location])

	return [currentLocation]
}