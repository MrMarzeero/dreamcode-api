import { Router, Request, Response } from 'express';
import { ProblemController } from './services/CPService/controllers'
import { QuizController } from './services/QuizService/controllers'
import { UserController } from './services/UserService/controllers/UserController';

const router = Router();

router
  .post('/quiz/generate', (req: Request, res: Response) => {
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
  })
  .post('/user/singUp', (req: Request, res: Response) => {
    UserController.createUser(req, res);
  })
  .post('/user/logIn', (req: Request, res: Response) => {
    UserController.logUser(req, res);
  })

export default router;
