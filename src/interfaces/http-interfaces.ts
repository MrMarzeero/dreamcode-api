import { Problem, SessionCreated, Solution, TestCases } from './genResponse-interfaces';

export interface HttpResponse {
  statusCode: number;
  body: object;
}

export interface genData {
  name?: String, 
  data: Problem | SessionCreated | Solution | TestCases;
}
