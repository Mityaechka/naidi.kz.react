import {User, UserRole} from '../models/user-data'
import {ApiData} from './api-data'
import Api from './index'
import {wait} from '../helpers/wait'
import {stringify} from 'querystring'
import {apiMethods} from './api-methods'

export type AuthModel = {
    email: string,
    password: string
}
export type CreateUserModel = {
    fio: string
    email: string
    password: string
}

export type EditUserModel = {
    fio: string
    email: string
    password: string
}


const getUsers = () => apiMethods.get<User[]>('api/users/all')

const getAuthUser =  () => apiMethods.get<User>('api/users')

const getUser = async (id: string) => apiMethods.get<User>(`api/users/${id}`)

const createUser = (model: CreateUserModel) => apiMethods.post<boolean>('api/users/create', model)

const editUser = (id: string, model: EditUserModel) => apiMethods.post<boolean>(`api/users/${id}/edit`, model)

const auth = async (model: AuthModel) => apiMethods.post<string>('api/users/auth', model)


export const adminApi = {
	getUsers,
	getUser,
	createUser,
	getAuthUser,
	editUser,
	auth
}