import {api} from "./api";
import {Resume} from "../models/Data";

export const getUserResumes = () => api.get<Resume[]>("api/resume/user")