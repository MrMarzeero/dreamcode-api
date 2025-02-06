import { Router, Request, Response } from 'express';
import { Controller } from './services/Controller'
import { ProblemController, SolutionController, TestCaseController } from './services/CPService/controllers'
import { QuizController } from './services/QuizService/controllers'
import { UserController } from './services/UserService/controllers/UserController';
import { authenticateToken } from './middleware/authenticateToken';

const router = Router();

router 
  
  .get('/all/:id', authenticateToken, (req: Request, res: Response) => {
    Controller.getAll(req, res)
  })
  .get('/quiz/:id', authenticateToken, (req: Request, res: Response) => {
    QuizController.getQuiz(req, res)
  })  
  .post('/quiz/generate', authenticateToken, (req: Request, res: Response) => {
    QuizController.generateQuiz(req, res);
  })
  .post('/cp/problem', authenticateToken, (req: Request, res: Response) => {
    ProblemController.generateProblem(req, res)
  })
  .get('/cp/problem/:id', authenticateToken, (req: Request, res: Response) => {
    ProblemController.getProblem(req, res)
  })
  .put('/cp/problem/:id', authenticateToken, (req: Request, res: Response) => {
    ProblemController.updateProblem(req, res)
  })
  .delete('/cp/problem/:id', authenticateToken, (req: Request, res: Response) => {
    ProblemController.deleteProblem(req, res)
  })
  .post('/cp/solution/:id', authenticateToken, (req: Request, res: Response) => {
    SolutionController.getSolution(req, res)
  })
  .post('/cp/test-cases/:id', authenticateToken, (req: Request, res: Response) => {
    TestCaseController.generateTestCases(req, res)
  })
  .post('/user/singUp', (req: Request, res: Response) => {
    UserController.createUser(req, res);
  })
  .post('/user/logIn', (req: Request, res: Response) => {
    UserController.logUser(req, res);
  })
  .get('/user/:id', authenticateToken, (req: Request, res: Response) => {
    UserController.getUser(req, res);
  })
  .put('/user/:id', authenticateToken, (req: Request, res: Response) => {
    UserController.updateUser(req, res);
  })
  .delete('/user/:id', authenticateToken, (req: Request, res: Response) => {
    UserController.deleteUser(req, res);
  })

export default router;
