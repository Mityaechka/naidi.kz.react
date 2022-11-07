import {apiMethods} from './api-methods'
import {Destination, Resume} from '../models/data'
import {stringify} from 'querystring'
import {ResumeFilterResult} from "../componets/filter/filter";

export type CreateResumeData = {
    activityId: string,
    destination: Destination,
    description: string
}

const getClientResumes = () => apiMethods.get<Resume[]>('api/resume/client')
const getClientResume = (resumeId: string) => apiMethods.get<Resume>(`api/resume/client/${resumeId}`)

const createResume = (data: CreateResumeData) => apiMethods.post('api/resume/client/create', data)

const sendToModeration = (resumeId: string) => apiMethods.post(`api/resume/client/${resumeId}/moderation`, {})
const editResume = (resumeId: string, data: CreateResumeData) => apiMethods.post(`api/resume/client/${resumeId}/edit`, data)
const findResumes = (filter: ResumeFilterResult | undefined = undefined) => apiMethods.post<Resume[]>(`api/resume/find`, filter)

export const resumeApi = {
	getClientResumes,
	createResume,
	sendToModeration,
	getClientResume,
	editResume,
	findResumes
}