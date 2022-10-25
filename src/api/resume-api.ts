import {apiMethods} from "./api-methods";
import {Destination, Resume} from "../models/data";
import {stringify} from "querystring";

export type CreateResumeData = {
    activityId: String,
    destination: Destination,
    description: string
}

const getUserResumes = () => apiMethods.get<Resume[]>("api/resume/user")
const getUserResume = (resumeId: string) => apiMethods.get<Resume>(`api/resume/user/${resumeId}`)

const createResume = (data: CreateResumeData) => apiMethods.post("api/resume/user/create", data)

const sendToModeration = (resumeId: string) => apiMethods.post(`api/resume/user/${resumeId}/moderation`, {})
const editResume = (resumeId: string, data: CreateResumeData) => apiMethods.post(`api/resume/user/${resumeId}/edit`, data)

export const resumeApi = {
    getUserResumes,
    createResume,
    sendToModeration,
    getUserResume,
    editResume
}