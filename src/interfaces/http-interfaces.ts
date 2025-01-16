import { Problem, Solution, TestCases } from './genResponse-interfaces';

export interface HttpResponse {
  statusCode: number;
  body: object;
}

export interface genData {
  data: Problem | Solution | TestCases;
}
