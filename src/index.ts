import express from 'express';
import router from './routes';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import cors from 'cors';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN
}));

app.listen(port, () => {
  console.log(`Server working on ${port}!`);
});
