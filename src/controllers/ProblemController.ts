import openai from '../lib/openai';
import { Request, Response } from 'express';
import { generateProblemPrompt, generateSolutionPrompt } from '../prompts'
import { GenProblemSchema, GenSolutionSchema } from '../schemas/schemas';

export class ProblemController {
    static async generateProblem(req: Request, res: Response) {
        try {
            GenProblemSchema.parse(req.body);
        }
        catch(err) {
            return res.status(400).json({ error: 'GENERATE PROBLEM: Bad Request: Invalid Parameter'})
        }
        try{
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: generateProblemPrompt },
                    { role: "user", content: JSON.stringify(req.body)},
                ]
            });

            const messageContent = completion.choices[0].message.content

            if(messageContent != null) {
                const jsonResponse = JSON.parse(messageContent)
                return res.status(201).json(jsonResponse)
            }
        } catch (err) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    static async generateSolution(req: Request, res: Response) {
        try {
            GenSolutionSchema.parse(req.body)
        } catch(err) {
            return res.status(400).json({ error: 'GENERATE SOLUTION: Bad Request: Invalid Parameter'})
        }
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: generateSolutionPrompt },
                    { role: "user", content: JSON.stringify(req.body)}
                ]
            });

            const messageContent = completion.choices[0].message.content
            if(messageContent != null) {
                return res.status(201).json(JSON.parse(messageContent))
            }
        } catch(err) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}
