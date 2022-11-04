import {Activity, Area, City} from '../models/data'
import moment from 'moment'
import {action, makeObservable, observable} from 'mobx'
import api from '../api'


export type CachedValue<T> = {
    time: Date,
    value: T
}

const isCacheValid = <T>(cache?: CachedValue<T>, ttlInMinute?: number) => {
	if (cache == undefined) {
		return false
	}

	return moment(cache.time).add(ttlInMinute, 'minute') >= moment()
}

export class CacheStore {
	cities?: CachedValue<City[]>
	areas?: CachedValue<Area[]>
	activities?: CachedValue<Activity[]>

	constructor() {
		makeObservable(this,{
			cities: observable,
			getAllCities: action
		})
	}


	getAllCities() {
		return new Promise<City[] | undefined>(resolve => {
			if (isCacheValid(this.cities, 5)) {
				resolve(this.cities!.value)
				return
			}

			api.dictionary.getCities().then(result => {
				if (!result.isSuccess) {
					resolve(undefined)
					return
				}

				this.cities = {value: result.result!, time: moment().toDate()}
				resolve(this.cities!.value)
			})
		})

	}

	getAllAreas() {
		return new Promise<Area[] | undefined>(resolve => {
			if (isCacheValid(this.areas, 5)) {
				resolve(this.areas!.value)
				return
			}

			api.dictionary.getAreas().then(result => {
				if (!result.isSuccess) {
					resolve(undefined)
					return
				}

				this.areas = {value: result.result!, time: moment().toDate()}
				resolve(this.areas!.value)
			})
		})
	}

	getAllActivities() {
		return new Promise<Activity[] | undefined>(resolve => {
			if (isCacheValid(this.activities, 5)) {
				resolve(this.activities!.value)
				return
			}

			api.dictionary.getActivities().then(result => {
				if (!result.isSuccess) {
					resolve(undefined)
					return
				}

				this.activities = {value: result.result!, time: moment().toDate()}
				resolve(this.activities!.value)
			})
		})
	}

}