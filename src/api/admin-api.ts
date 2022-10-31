import {User, UserRole} from "../models/user-data";
import {ApiData} from "./api-data";
import Api from "./index";
import {wait} from "../helpers/wait";
import {stringify} from "querystring";

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


const users: User[] = [
    {id: '1', fio: 'Юзер 1', email: 'test1@test.com', role: UserRole.Admin},
    {id: '2', fio: 'Юзер 2', email: 'test2@test.com', role: UserRole.Moderator},
    {id: '3', fio: 'Юзер 3', email: 'test3@test.com', role: UserRole.Moderator},
]

const getUsers = async (): Promise<ApiData<User[]>> => {
    return {isSuccess: true, result: users}
}

const getAuthUser = async (): Promise<ApiData<User>> => {
    await wait(1000);
    return {isSuccess: false, result: users[0]};
}

const getUser = async (id: string): Promise<ApiData<User>> => {
    await wait(1000)

    const user = users.find(x => x.id == id)

    if (!user) {
        return {isSuccess: false, errorMessage: 'dsfdsf', result: {} as User}
    }

    return {isSuccess: true, result: user}
}


const createUser = async (model: CreateUserModel): Promise<ApiData<boolean>> => {
    return {isSuccess: true, result: true}
}
const editUser = async (model: EditUserModel): Promise<ApiData<boolean>> => {
    return {isSuccess: true, result: true}
}

const auth = async (model: AuthModel):Promise<ApiData<string>> => {
    await wait(1000)
    return {isSuccess: true, result: 'token'}
}


export const adminApi = {
    getUsers,
    getUser,
    createUser,
    getAuthUser,
    auth
}