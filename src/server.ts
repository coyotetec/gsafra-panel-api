import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.listen(port, () => console.log(`Server is running on port ${port}`));
