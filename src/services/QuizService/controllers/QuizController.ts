import openai from '../../../lib/openai';
import { Request, Response } from 'express';
import { generateQuizPrompt } from '../prompts';
import { genQuizSchema } from '../../../validation';
import { badRequest, internalServerError, generationSuccess } from '../../../helpers';

export class QuizController {
    static async generateQuiz(req: Request, res: Response) {
        try {
            genQuizSchema.parse(req.body);
          } catch (err) {
            if (err instanceof Error) return res.status(400).json(badRequest(err));
          }
          try {
            const completion = await openai.chat.completions.create({
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: generateQuizPrompt },
                { role: 'user', content: JSON.stringify(req.body) },
              ],
            });
      
            const messageContent = completion.choices[0].message.content;
      
            if (messageContent != null) {
              const jsonResponse = JSON.parse(messageContent);
              return res.status(201).json(generationSuccess(jsonResponse));
            }
          } catch (err) {
            if (err instanceof Error) return res.status(500).json(internalServerError(err));
          }
    }
}