import { Request, Response } from 'express';
import instructions from '../instructions.json'
import openai from '../lib/openai'

export class ProblemController {
    static async generateProblem(req: Request, res: Response) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: instructions.code },
                    { role: "user", content: req.body },
                ]
            })
    
            return res.status(200).json(completion);
        }
        catch(error) { 
            return res.status(500).json({error: 'Internal server error'});
        }
    }
}