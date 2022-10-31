import {apiMethods} from "./api-methods";
import {Gender} from "../models/data";
export type EditClientProfile = {
    firstName: string,
    lastName: string,
    secondName: string,
    birthDate: Date,
    gender: Gender,
    areaId?: string,
    cityId?: string
}

const editClientProfile = (data: EditClientProfile) => apiMethods.post('api/client/profile/edit', data);

export const clientApi = {
    editClientProfile
}