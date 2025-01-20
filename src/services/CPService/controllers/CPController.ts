import openai from '../../../lib/openai';
import { Request, Response } from 'express';
import { generateProblemPrompt, generateSolutionPrompt, generateTestCasesPrompt } from '../prompts';
import { genProblemSchema, genSolutionSchema, genTestCasesSchema } from '../../../validation';
import { badRequest, internalServerError, generationSuccess, uInternalServerError } from '../../../helpers';
import { prismaClient } from '../../../database/prismaClient';
import { json } from 'stream/consumers';

export class ProblemController {
  static async generateProblem(req: Request, res: Response) {
    try {
      genProblemSchema.parse(req.body);
    } catch (err) {
      if (err instanceof Error) return res.status(400).json(badRequest(err));
    }
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: generateProblemPrompt },
          { role: 'user', content: JSON.stringify(req.body) },
        ],
      });

      const messageContent = completion.choices[0].message.content;

      if(messageContent == null)
          return res.status(400).json(uInternalServerError("Cannot generate CpProblem"))
      const jsonProblem = JSON.parse(messageContent)
      const problem = await prismaClient.cPQuest.create({
        data: {
          name: jsonProblem.name,
          statement: jsonProblem.statement,
          input: jsonProblem.input,
          output: jsonProblem.output,
          sample_input: jsonProblem.sample_input,
          sample_output: jsonProblem.sample_output,
          notes: jsonProblem.notes,
          author: {
            connect: {
              id: req.params.userId,
            }
          }
        }
      })
      return res.status(201).json(problem)

    } catch (err) {
      if (err instanceof Error) return res.status(500).json(internalServerError(err));
    }
  }

  static async generateSolution(req: Request, res: Response) {
    try {
      const { statement, input, output, sample_input, sample_output, notes } = req.body
      const problem = await prismaClient.cPQuest.findUnique({where: {id: req.body.id}})
      if(problem == null)
          return res.status(400).json({error: "Cannot find this problem"})
      if(req.params.userId != problem.authorId)
          return res.status(401).json({error: "Access Denied"})
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: generateSolutionPrompt },
          { role: 'user', content: JSON.stringify({
            statement, input, output, sample_input, sample_output, notes
          }) },
        ],
      });

      const messageContent = completion.choices[0].message.content;
      if(messageContent == null) 
        return res.status(500).json(uInternalServerError("Cannot generate problem solution"))

      const jsonResponse = JSON.parse(messageContent)
      const solution = await prismaClient.cPSolution.create({
        data: {
          solution: jsonResponse.solution,
          question: {
            connect: {
              id: req.body.id
            }
          }
        }
      })

      return res.status(201).json(solution)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json(internalServerError(err));
      }
    }
  }

  static async generateTestCases(req: Request, res: Response) {
    try {
      const { statement, input, output, sample_input, sample_output, notes } = req.body
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: generateTestCasesPrompt },
          { role: 'user', content: JSON.stringify({
            statement, input, output, sample_input, sample_output, notes
          }) },
        ],
      });

      const messageContent = completion.choices[0].message.content;
      if (messageContent == null) 
      return res.status(500).json(uInternalServerError("Cannot generate problem test-cases"))
      const problem = await prismaClient.cPQuest.findUnique({where: {id: req.body}})
      if(problem == null)
          return res.status(500).json(uInternalServerError("Cannot find this problem"))
      if(req.params.userId != problem.authorId)
          return res.status(401).json("Access Denied")
      const jsonResponse = JSON.parse(messageContent);

      for (const testCase of jsonResponse) {
        await prismaClient.cPTestCase.create({
          data: {
            input: testCase.input,
            output: testCase.output,
            question: {
              connect: {
                id: req.body.id
              }
            }
          }
        })
      }

    } catch (err) {
      if (err instanceof Error) return res.status(500).json(internalServerError(err));
    }
  }
}
