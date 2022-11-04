export class ApiData<T> {
	isSuccess = false
	errorMessage?: string
	result: T = {} as T
}

export type TApiData = ApiData<never>


