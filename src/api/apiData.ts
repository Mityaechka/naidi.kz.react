export class ApiData<T> {
    isSuccess: boolean = false;
    errorMessage?: string;
    result?: T;
}

export type TApiData = ApiData<never>

