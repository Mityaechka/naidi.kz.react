import axios from "axios";
import {variables} from "../variables";
import {ApiData} from "./apiData";
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

            resolve({isSuccess: false});
        }).catch(error => {
            resolve({isSuccess: false})
        })
        }catch {
            resolve({isSuccess: false})
        }
    })
}

const sendApiGet = <T>(url: string) => sendApiRequest<T>('GET', url, undefined)
const sendApiPost = <T>(url: string, data: any) => sendApiRequest<T>('POST', url, data)

export const api = {
    request: sendApiRequest,
    get: sendApiGet,
    post: sendApiPost,
    saveToken: saveJwtToken,
    getToken: getJwtToken
}