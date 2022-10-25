import {Localized} from "../models/data";

export const localize = (value?: Localized, defaultValue: string = "") => {
    if(!value){
        return defaultValue
    }
    return value.ru
}