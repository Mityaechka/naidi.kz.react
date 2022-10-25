export class ApiData<T> {
    isSuccess: boolean = false;
    errorMessage?: string;
    result: T = {} as T;
}

export type TApiData = ApiData<never>


