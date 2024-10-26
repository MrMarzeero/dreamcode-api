import { Router } from 'express';
import { ProblemController } from './controllers/ProblemController';

const router = Router();

router
.post('generate-problem', ProblemController.generateProblem)