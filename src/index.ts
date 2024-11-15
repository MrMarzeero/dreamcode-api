import express from 'express';
import router from './routes';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.json';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

config();

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`Server working on ${port}!`);
});
