import { Problem } from './genResponse-interfaces';

export interface GenProblem {
  language: string;
  context: string;
  topics: Array<string>;
  level: string;
}

export interface GenSolution {
  language: string;
  problem: Problem;
}

export interface GenTestCases {
  test_cases: number;
  problem: Problem;
}
