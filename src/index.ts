import express, { Request, Response, NextFunction } from 'express';
import router from './routes';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/generate', router);

app.listen(port, () => {
  console.log(`Server working on ${port}!`);
});