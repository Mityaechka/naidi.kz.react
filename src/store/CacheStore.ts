import {Area, City} from "../models/Data";
import moment from "moment";
import {getCities} from "../api/dictionaryApi";
import {action, makeObservable, observable} from "mobx";


export type CachedValue<T> = {
    time: Date,
    value: T
}

const isCacheValid = <T>(cache?: CachedValue<T>, ttlInMinute?: number) => {
    if (cache == undefined) {
        return false;
    }

    return moment(cache.time).add(ttlInMinute, "minute") >= moment();
}

export class CacheStore {
    cities?: CachedValue<City[]>
    areas?: CachedValue<City[]>

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

            getCities().then(result => {
                if (!result.isSuccess) {
                    resolve(undefined)
                    return
                }

                this.cities = {value: result.result!, time: moment().toDate()}
                resolve(this.cities!.value)
            })
        })

    }

}