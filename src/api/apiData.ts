export class ApiData<T> {
    isSuccess: boolean = false;
    errorMessage?: string;
    result: T = {} as T;
}

export type TApiData = ApiData<never>

//export function isSuccess<T>(result: ApiData<T>): asserts result is

