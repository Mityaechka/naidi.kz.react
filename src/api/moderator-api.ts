import api from "./index";
import {apiMethods} from "./api-methods";
import {ModerationResumeRequest, RejectReason} from "../models/user-data";
import {Localized} from "../models/data";

export type ApproveData = {
    description?: Localized
}
export type RejectData = {
    rejectItems: {reason: RejectReason}[]
}

const getResumeRequests = () => apiMethods.get<ModerationResumeRequest[]>('api/admin/moderator/resumes')
const getResumeRequest = (resumeId: string) => apiMethods.get<ModerationResumeRequest>(`api/admin/moderator/resumes/${resumeId}`)
const approveRequest = (resumeId: string, data: ApproveData) => apiMethods.post(`api/admin/moderator/resumes/${resumeId}/approve`, data)
const rejectRequest = (resumeId: string, data: RejectData) => apiMethods.post(`api/admin/moderator/resumes/${resumeId}/reject`, data)

export const moderatorApi = {
    getResumeRequests: getResumeRequests,
    getResumeRequest: getResumeRequest,
    approveRequest: approveRequest,
    rejectRequest: rejectRequest
}