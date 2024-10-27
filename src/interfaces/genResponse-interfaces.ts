export interface Problem {
    name: string,
    statement: string,
    input: string,
    output: string,
    sample_input: string,
    sample_output: string,
    notes: string,
}

export interface Solution {
    solution: string,
}

export interface TestCases {
    test_cases: Array<string>
}
 