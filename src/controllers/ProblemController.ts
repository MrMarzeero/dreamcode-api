import { Request, Response } from 'express';
import openai from '../lib/openai'

export class ProblemController {
    static async generateProblem(req: Request, res: Response) {
        let { language, contest, tags, level } = req.body;


    }
}