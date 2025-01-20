import openai from '../../../lib/openai';
import { Request, Response } from 'express'
import { genProblemSchema } from '../../../validation';
import { badRequest, internalServerError, generationSuccess, uInternalServerError, ubadRequest } from '../../../helpers';
import { prismaClient } from '../../../database/prismaClient';
import { generateProblemPrompt, generateSolutionPrompt, generateTestCasesPrompt } from '../prompts';

export class ProblemController {
    static async generateProblem(req: Request, res: Response) {
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

    static async getProblem(req: Request, res: Response) {
        try {
            const problem = await prismaClient.cPQuest.findUnique({ where: {id: req.params.id }})
            if(problem == null)
                return res.status(400).json({ error: "Cannot find this problem"})
            if(problem.authorId != req.params.userId)
                return res.status(500).json(uInternalServerError("Access Denied"))
            return res.status(200).json(problem)
        } catch(err) {
            if(err instanceof Error) return res.status(500).json(internalServerError(err))
        }
    }

    static async updateProblem(req: Request, res: Response) {
        try {
            const { statement, input, output, sample_input, sample_output, notes } = req.body
            const problem = await prismaClient.question.findUnique({where: {id: req.params.id}})
            if(problem == null) 
                return res.status(400).json(ubadRequest("Cannot find this problem"))
            const quiz = await prismaClient.quiz.findUnique({where: {id: problem.quizId}})
            if(quiz?.authorId != req.params.userId)
                return res.status(401).json("Access Denied")

            const updateData: any = {};
            if (statement !== undefined) updateData.statement = statement;
            if (input !== undefined) updateData.input = input;
            if (output !== undefined) updateData.output = output;
            if (sample_input !== undefined) updateData.sample_input = sample_input;
            if (sample_output !== undefined) updateData.sample_output = sample_output;
            if (notes !== undefined) updateData.notes = notes;
      
            const updatedProblem = await prismaClient.question.update({
              where: { id: req.params.id },
              data: updateData,
            });
      
            return res.status(200).json(updatedProblem);
        } catch(err) {
            if(err instanceof Error) return res.status(500).json(internalServerError(err))
        }
    }

    static async deleteProblem(req: Request, res: Response) {
        try {
            const problem = await prismaClient.cPQuest.findUnique({where: {id: req.params.id}})
            if(problem == null) 
                return res.status(400).json({error: "Cannot find this problem"})
            if(problem.authorId != req.params.userId)
                return res.status(401).json({error: "Access Denied"})
            const deleteProblem = await prismaClient.cPQuest.delete({where: {id: req.params.id}})
            return res.status(200).json("Success!")
        } catch(err) {
            if(err instanceof Error) return res.status(500).json(internalServerError(err))
        }
    }
}