import { Request, Response } from 'express'
import { internalServerError } from '../helpers';
import { prismaClient } from '../database/prismaClient';

export class Controller {
    static async getAll(req: Request, res: Response) {
        try {
            if(req.params.userId != req.params.id)
                return res.status(401).json("Access Denied")
            const problems = await prismaClient.cPQuest.findMany({where: {authorId: req.params.id}})
            const quizzes = await prismaClient.quiz.findMany({where: {authorId: req.params.id}})

            const combinedObjects: { id: string; name: string, type: string }[] = [];

            problems.forEach((problem) => {
            combinedObjects.push({ id: problem.id, name: problem.name, type: "cp" });
            });

            quizzes.forEach((quiz) => {
            combinedObjects.push({ id: quiz.id, name: quiz.name, type: "quiz" });
            });
            return res.status(200).json(combinedObjects)
        } catch(err) {
            if(err instanceof Error) return res.status(500).json(internalServerError(err));
        }
    }
    
}
