import express from 'express'
import router from './routes'
import { config } from 'dotenv'

config();


const app = express();
const port = process.env.PORT;
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log(`Server working on ${port}!`);
})