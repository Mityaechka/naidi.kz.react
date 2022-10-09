import {api} from "./api";
import {stringify} from "querystring";
import {User} from "../models/Data";

export const checkPhone = (phone: string) => api.post<unknown>('api/account/check-phone', {phone});

export const sendVerificationSms = (phone: string) => api.post<unknown>('api/account/send-verification-sms', {phone});

export const checkVerificationSms = (data: {phone: string, sms: string}) => api.post<unknown>('api/account/check-verification-sms', data);

export const register = (data: {phone: string, sms: string, password: string}) => api.post<string>('api/account/register', data);

export const login = (data: {phone: string, password: string}) => api.post<string>('api/account/login', data);

export const user = () => api.get<User>('api/account/user');