import { Request, Response } from 'express'
import { internalServerError } from '../helpers';
import { prismaClient } from '../database/prismaClient';

export class Controller {
    static async getAll(req: Request, res: Response) {
        try {
            const problems = await prismaClient.cPQuest.findMany({where: {authorId: req.params.userId}})
            const quizzes = await prismaClient.quiz.findMany({where: {authorId: req.params.userId}})
            const combinedObjects: { id: string; name: string, topics?: string[] }[] = [];

            if(problems != null) {
                problems.forEach((problem) => {
                    combinedObjects.push({ id: problem.id, name: problem.name });
                });
            }
            if(quizzes != null) {
                quizzes.forEach((quiz) => {
                    combinedObjects.push({ id: quiz.id, name: quiz.name, topics: quiz.topics });
                });
            }
            
            return res.status(200).json(combinedObjects)
        } catch(err) {
            if(err instanceof Error) return res.status(500).json(internalServerError(err));
        }
    }
    
}