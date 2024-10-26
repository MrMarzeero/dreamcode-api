import { z } from 'zod'

export const ProblemSchema = z.object({
    name: z.string(),
    statement: z.string(),
    input: z.string(),
    output: z.string(),
    sample_input: z.string(),
    sample_output: z.string(),
    notes: z.string(),
})

export const GenProblemSchema = z.object({
    language: z.string(),
    context: z.string(),
    topics: z.array(z.string()),
    level: z.string(),
})

export const GenSolutionSchema = z.object({
    language: z.string(),
    problem: ProblemSchema,
})