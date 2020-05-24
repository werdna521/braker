import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route';
import postRouter from './routes/post.route';
import config from './config/config';

const port = 3000 || process.env.PORT;
const app: express.Application = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser(config._secret));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);

app.listen(port, () => console.log(`Server running on port number ${port}`));