import { Problem, Solution, TestCases } from './genResponse-interfaces'

export interface HttpResponse {
    statusCode: number, 
    body: {
        status: string,
        error?: Error,
        data?:any 
    },
}

export interface genData {
    data: Problem | Solution | TestCases
}