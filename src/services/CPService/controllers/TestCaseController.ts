import openai from '../../../lib/openai';
import { Request, Response } from 'express'
import { internalServerError, uInternalServerError } from '../../../helpers';
import { prismaClient } from '../../../database/prismaClient';
import { generateTestCasesPrompt } from '../prompts';

export class TestCaseController {
    static async generateTestCases(req: Request, res: Response) {
        try {
          const { test_cases } = req.body
          const problem = await prismaClient.cPQuest.findUnique({where: {id: req.params.id}})
          if(problem == null)
              return res.status(400).json({error: "Cannot find this problem"})
          if(req.params.userId != problem.authorId)
              return res.status(401).json({error: "Access Denied"})
          
          const combined = {
            test_cases,
            problem: {
              name: problem.name,
              statement: problem.statement,
              input: problem.input,
              output: problem.output,
              sample_input: problem.sample_input,
              sample_output: problem.sample_output,
              notes: problem.notes
            }
          }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: generateTestCasesPrompt },
              { role: 'user', content: JSON.stringify(req.body)  },
            ],
          });
          console.log(combined)
          
          const messageContent = completion.choices[0].message.content;
          if (messageContent == null) 
          return res.status(500).json(uInternalServerError("Cannot generate problem test-cases"))
          const jsonResponse = JSON.parse(messageContent);
          
          return res.status(201).json(jsonResponse)    
        } catch (err) {
          if (err instanceof Error) return res.status(500).json(internalServerError(err));
        }
      }
}