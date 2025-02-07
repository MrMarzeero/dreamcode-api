import { Router, Request, Response } from 'express';
import { Controller } from './services/Controller'
import { ProblemController, SolutionController, TestCaseController } from './services/CPService/controllers'
import { QuizController } from './services/QuizService/controllers'
import { UserController } from './services/UserService/controllers/UserController';
import { authenticateToken } from './middleware/authenticateToken';

const router = Router();

router 
  .post('/correct/:id', authenticateToken, (req: Request, res: Response) => {
    QuizController.correctQuest(req, res)
  })
  .get('/all/', authenticateToken, (req: Request, res: Response) => {
    Controller.getAll(req, res)
  })
  .get('/quiz/:id', authenticateToken, (req: Request, res: Response) => {
    QuizController.getQuiz(req, res)
  })  
  .delete('/quiz/:id', authenticateToken, (req: Request, res: Response) => {
    QuizController.deleteQuiz(req, res);
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
  .get('/cp/solution/:id', authenticateToken, (req: Request, res: Response) => {
    SolutionController.getSolution(req, res)
  })
  .post('/cp/test-cases/:id', authenticateToken, (req: Request, res: Response) => {
    TestCaseController.generateTestCases(req, res)
  })
  .post('/user/signUp', (req: Request, res: Response) => {
    UserController.createUser(req, res);
  })
  .post('/user/logIn', (req: Request, res: Response) => {
    UserController.logUser(req, res);
  })
  .get('/user/', authenticateToken, (req: Request, res: Response) => {
    UserController.getUser(req, res);
  })
  .put('/user/', authenticateToken, (req: Request, res: Response) => {
    UserController.updateUser(req, res);
  })
  .delete('/user/', authenticateToken, (req: Request, res: Response) => {
    UserController.deleteUser(req, res);
  })

export default router;
