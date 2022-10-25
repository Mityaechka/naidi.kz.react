import {apiMethods} from "./api-methods";
import {Gender} from "../models/data";
export type EditUserProfile = {
    firstName: string,
    lastName: string,
    secondName: string,
    birthDate: Date,
    gender: Gender,
    areaId?: string,
    cityId?: string
}

const editUserProfile = (data: EditUserProfile) => apiMethods.post('api/user/profile/edit', data);

export const userApi = {
    editUserProfile
}