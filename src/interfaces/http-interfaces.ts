import { Problem, Solution, TestCases } from './genResponse-interfaces';

export interface HttpResponse {
  statusCode: number;
  body: {
    status: string;
    error?: Error;
    data?: genData;
  };
}

export interface genData {
  data: Problem | Solution | TestCases;
}
