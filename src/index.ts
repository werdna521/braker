import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.route';

const port = 3000 || process.env.PORT;
const app: express.Application = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/auth', authRouter);

app.listen(port, () => console.log(`Server running on port number ${port}`));