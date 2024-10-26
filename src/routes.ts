import { Router, Request, Response, NextFunction } from 'express';
import { ProblemController } from './controllers/ProblemController';

const router = Router();



router
.post('/generate-problem', (req: Request, res: Response) => {
    ProblemController.generateProblem(req, res);
})

export default router;