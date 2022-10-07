import {isNumberObject} from "util/types";
import {api} from "./api";
import {Area, City} from "../models/Data";

export const getCities = () => api.get<City[]>('api/dcitionary/city');

export const getAreas = () => api.get<Area[]>('api/dcitionary/area');