import { Request, Response } from 'express';
import instructions from '../instructions.json'
import openai from '../lib/openai'

export class ProblemController {
    static async generateProblem(req: Request, res: Response) {
        try {
            const { language, context, topics, level } = req.body;
            if(!language || !context || !topics || !level) 
                return res.status(400).json({error: 'Bad Request: Missing Informations (language, context, topics or level)'})

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: instructions.code },
                    { role: "user", content: `Language: ${language}, Context: ${context}, Topics: ${topics}, Level: ${level}`},
                ]
            })
            return res.status(201).json(completion.choices[0].message)
        }
        catch(error) { 
            return res.status(500).json({error: 'Internal server error'});
        }
    }
}