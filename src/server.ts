import 'dotenv/config';
import 'express-async-errors';
import './app/jobs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './app/middlewares/errorHandler';
import { gsafraRouter } from './app/routers/gsafraRouter';
import { panelRouter } from './app/routers/panelRouter';

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(panelRouter);
app.use('/gsafra', gsafraRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
