import {apiMethods} from './api-methods'
import {stringify} from 'querystring'
import {Client} from '../models/data'

const checkPhone = (phone: string) => apiMethods.post<unknown>('api/account/check-phone', {phone})

const sendVerificationSms = (phone: string) => apiMethods.post<unknown>('api/account/send-verification-sms', {phone})

const checkVerificationSms = (data: {phone: string, sms: string}) => apiMethods.post<unknown>('api/account/check-verification-sms', data)

const register = (data: {phone: string, sms: string, password: string}) => apiMethods.post<string>('api/account/register', data)

const login = (data: {phone: string, password: string}) => apiMethods.post<string>('api/account/login', data)

const getClient = () => apiMethods.get<Client>('api/account/client')

export const accountApi = {
	checkPhone,
	sendVerificationSms,
	checkVerificationSms,
	register,
	login,
	getClient: getClient
}