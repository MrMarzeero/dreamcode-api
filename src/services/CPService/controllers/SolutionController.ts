import openai from '../../../lib/openai';
import { Request, Response } from 'express'
import { genProblemSchema } from '../../../validation';
import { badRequest, internalServerError, generationSuccess, uInternalServerError, ubadRequest } from '../../../helpers';
import { prismaClient } from '../../../database/prismaClient';
import { generateProblemPrompt, generateSolutionPrompt, generateTestCasesPrompt } from '../prompts';

export class SolutionController {
    static async getSolution(req: Request, res: Response) {
        try {
          const { statement, input, output, sample_input, sample_output, notes } = req.body
          const problem = await prismaClient.cPQuest.findUnique({where: {id: req.params.id}})
          if(problem == null)
              return res.status(400).json({error: "Cannot find this problem"})
          if(req.params.userId != problem.authorId)
              return res.status(401).json({error: "Access Denied"})

          const checkSolution = await prismaClient.cPSolution.findUnique({where: {questionId: req.params.id}})
          if(checkSolution != null)
            return res.status(200).json(checkSolution)

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
                  id: req.params.id
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
}