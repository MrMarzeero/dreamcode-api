import { Router, Request, Response } from 'express';
import { ProblemController } from './controllers/GenerateController';

const router = Router();

router
  .post('/problem', (req: Request, res: Response) => {
    ProblemController.generateProblem(req, res);
  })
  .post('/solution', (req: Request, res: Response) => {
    ProblemController.generateSolution(req, res);
  })
  .post('/test-cases', (req: Request, res: Response) => {
    ProblemController.generateTestCases(req, res);
  });

export default router;
