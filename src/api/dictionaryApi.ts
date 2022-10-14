import {isNumberObject} from "util/types";
import {api} from "./api";
import {Activity, Area, City} from "../models/Data";

export const getCities = () => api.get<City[]>('api/dcitionary/city');

export const getAreas = () => api.get<Area[]>('api/dcitionary/area');

export const getActivities = () => api.get<Activity[]>('api/dcitionary/activity');