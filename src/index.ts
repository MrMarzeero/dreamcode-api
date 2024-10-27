import express from 'express';
import router from './routes';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json'

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
  console.log(`Server working on ${port}!`);
});
