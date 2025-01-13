import openai from '../../../lib/openai';
import { Request, Response } from 'express';
import { generateProblemPrompt, generateSolutionPrompt, generateTestCasesPrompt } from '../prompts';
import { genProblemSchema, genSolutionSchema, genTestCasesSchema } from '../validation';
import { badRequest, internalServerError, generationSuccess } from '../../../helpers';

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

      if (messageContent != null) {
        const jsonResponse = JSON.parse(messageContent);
        return res.status(201).json(generationSuccess(jsonResponse));
      }
    } catch (err) {
      if (err instanceof Error) return res.status(500).json(internalServerError(err));
    }
  }

  static async generateSolution(req: Request, res: Response) {
    try {
      genSolutionSchema.parse(req.body);
    } catch (err) {
      if (err instanceof Error) return res.status(400).json(badRequest(err));
    }
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: generateSolutionPrompt },
          { role: 'user', content: JSON.stringify(req.body) },
        ],
      });

      const messageContent = completion.choices[0].message.content;
      if (messageContent != null) {
        const jsonResponse = JSON.parse(messageContent);
        return res.status(201).json(generationSuccess(jsonResponse));
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json(internalServerError(err));
      }
    }
  }

  static async generateTestCases(req: Request, res: Response) {
    try {
      genTestCasesSchema.parse(req.body);
    } catch (err) {
      if (err instanceof Error) return res.status(400).json(badRequest(err));
    }
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: generateTestCasesPrompt },
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
