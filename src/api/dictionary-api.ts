import {isNumberObject} from 'util/types'
import {apiMethods} from './api-methods'
import {Activity, Area, City} from '../models/data'

const getCities = () => apiMethods.get<City[]>('api/dcitionary/city')

const getAreas = () => apiMethods.get<Area[]>('api/dcitionary/area')

const getActivities = () => apiMethods.get<Activity[]>('api/dcitionary/activity')

export const dictionaryApi = {
	getCities,
	getAreas,
	getActivities
}