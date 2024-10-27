import express from 'express';
import router from './routes';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/generate', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup())

app.listen(port, () => {
  console.log(`Server working on ${port}!`);
});
