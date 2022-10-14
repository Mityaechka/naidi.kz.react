import {api} from "./api";
import {Gender} from "../models/Data";
export type EditUserProfile = {
    firstName: string,
    lastName: string,
    secondName: string,
    birthDate: Date,
    gender: Gender,
    areaId?: string,
    cityId?: string
}

export const editUserProfile = (data: EditUserProfile) => api.post('api/user/profile/edit', data);