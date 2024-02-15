import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './router';

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(router);
app.listen(port, () => console.log(`Server is running on port ${port}`));
