import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { chatRoutes } from './routes/chatRoutes';

export const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(cors());
app.use(express.json());

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', chatRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
