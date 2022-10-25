import axios from "axios";
import {variables} from "../variables";
import {ApiData} from "./api-data";
import {promises} from "dns";

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt')

    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
})

const saveJwtToken = (token: string) => {
    localStorage.setItem('jwt', token)
}

const getJwtToken = () => {
    return localStorage.getItem('jwt')
}


const sendApiRequest = async <T>(method: string, url: string, data: any): Promise<ApiData<T>> => {
    const apiUrl = `${variables.baseUrl}/${url}`

    return new Promise<ApiData<T>>(resolve => {
        try {
        axios({
            method: method,
            url: apiUrl,
            data: data,
        }).then(response => {
            if (response.status == 200) {
                resolve(response.data as ApiData<T>)
            }

            resolve({isSuccess: false, result: {} as T});
        }).catch(error => {
            resolve({isSuccess: false, result: {} as T})
        })
        }catch {
            resolve({isSuccess: false, result: {} as T})
        }
    })
}

const sendApiGet = <T>(url: string) => sendApiRequest<T>('GET', url, undefined)
const sendApiPost = <T>(url: string, data: any) => sendApiRequest<T>('POST', url, data)

export const apiMethods = {
    request: sendApiRequest,
    get: sendApiGet,
    post: sendApiPost,
    saveToken: saveJwtToken,
    getToken: getJwtToken
}