import { z } from 'zod';

export const problemSchema = z.object({
  name: z.string(),
  statement: z.string(),
  input: z.string(),
  output: z.string(),
  sample_input: z.string(),
  sample_output: z.string(),
  notes: z.string(),
});

export const genProblemSchema = z.object({
  language: z.string(),
  context: z.string(),
  topics: z.array(z.string()),
  level: z.string(),
});

export const genSolutionSchema = z.object({
  language: z.string(),
  problem: problemSchema,
});

export const genTestCasesSchema = z.object({
  test_cases: z.number(),
  problem: problemSchema,
});

export const genQuizSchema = z.object({
  subject: z.string(),
  topics: z.array(z.string()),
  quizType: z.string(),
  questionsAmount: z.number(),
  description: z.string(),
})

export const singUpSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(8).max(35),
})
