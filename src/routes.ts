import { Router, Request, Response } from 'express';
import { ProblemController } from './services/CPService/controllers'
import { QuizController } from './services/QuizService/controllers'

const router = Router();

router
  .post('/quiz/problem', (req: Request, res: Response) => {
    QuizController.generateQuiz(req, res);
  })
  .post('/cp/problem', (req: Request, res: Response) => {
    ProblemController.generateProblem(req, res);
  })
  .post('/cp/solution', (req: Request, res: Response) => {
    ProblemController.generateSolution(req, res);
  })
  .post('/cp/test-cases', (req: Request, res: Response) => {
    ProblemController.generateTestCases(req, res);
  });

export default router;
