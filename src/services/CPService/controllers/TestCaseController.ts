import openai from '../../../lib/openai';
import { Request, Response } from 'express'
import { internalServerError, uInternalServerError } from '../../../helpers';
import { prismaClient } from '../../../database/prismaClient';
import { generateTestCasesPrompt } from '../prompts';

export class TestCaseController {
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
          const jsonResponse = JSON.parse(messageContent);
          
          return res.status(201).json(jsonResponse)    
        } catch (err) {
          if (err instanceof Error) return res.status(500).json(internalServerError(err));
        }
      }
}