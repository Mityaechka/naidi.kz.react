import {useEffect, useState} from "react";
import {User} from "../models/user-data";
import {useParams} from "react-router-dom";
import api from "../api";
import {ApiData} from "../api/api-data";

export const usePromises = <T>(promises: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]> => {
    return new Promise(resolve => {
        Promise.all(promises).then(result => {
            resolve(result)
        })
    })

}

export const useApiCall = <T>(defaultValue: T, apicCall: Promise<ApiData<T>>,
                              loadingWrapper: (promise: Promise<ApiData<T>>) => Promise<ApiData<T>>): [T, () => Promise<void>] => {
    const [value, setValue] = useState<T>(defaultValue)

    const fetch = () => loadingWrapper(apicCall).then(result => {
        if (!result.isSuccess) {
            return
        }

        setValue(result.result)
    })
    useEffect(() => {
        fetch()
    }, [])


    return [value, fetch]
}

