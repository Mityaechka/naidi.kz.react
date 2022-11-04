import {Localized} from '../models/data'

export const localize = (value?: Localized, defaultValue = '') => {
	if(!value){
		return defaultValue
	}
	return value.ru
}