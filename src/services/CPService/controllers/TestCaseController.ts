import openai from '../../../lib/openai';
import { Request, Response } from 'express'
import { internalServerError, uInternalServerError } from '../../../helpers';
import { prismaClient } from '../../../database/prismaClient';
import { generateTestCasesPrompt } from '../prompts';

export class TestCaseController {
    static async generateTestCases(req: Request, res: Response) {
        try {
        const { statement, input, output, sample_input, sample_output, notes } = req.body
          const problem = await prismaClient.cPQuest.findUnique({where: {id: req.params.id}})
          if(problem == null)
              return res.status(500).json(uInternalServerError("Cannot find this problem"))
          if(req.params.userId != problem.authorId)
              return res.status(401).json("Access Denied")
        
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
          const jsonResponse = JSON.parse(messageContent);
    
          for (const testCase of jsonResponse) {
            await prismaClient.cPTestCase.create({
              data: {
                input: testCase.input,
                output: testCase.output,
                question: {
                  connect: {
                    id: req.params.id
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