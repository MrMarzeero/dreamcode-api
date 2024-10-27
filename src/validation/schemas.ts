import { z } from 'zod'

export const problemSchema = z.object({
    name: z.string(),
    statement: z.string(),
    input: z.string(),
    output: z.string(),
    sample_input: z.string(),
    sample_output: z.string(),
    notes: z.string(),
})

export const genProblemSchema = z.object({
    language: z.string(),
    context: z.string(),
    topics: z.array(z.string()),
    level: z.string(),
})

export const genSolutionSchema = z.object({
    language: z.string(),
    problem: problemSchema,
})

export const genTestCasesSchema = z.object({
    test_cases: z.number(),
    problem: problemSchema,
})