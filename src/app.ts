/**
 * Application source file
 */
import express, { Application } from 'express';
import './config/dbconfig'
import router from './routes';
import cors from 'cors';

const app: Application = express();

//allow cors from specific region
app.use(cors({
  origin: 'http://localhost:3000',
}))

app.use(express.json());

//application routes
app.use('/api/v1', router);

app.listen(process.env.PORT, () => console.log(`Server connected at ${process.env.PORT}`));