import express, { Application, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';

dotenv.config();

const app: Application = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(
  '/',
  async (_req: Request, _res: Response): Promise<void> => {
    _res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  }
);

app.get('/api', (_req: Request, _res: Response): void => {
  _res.json({ message: 'Hello from server!' });
});

app.get('/search', (_req: Request, _res: Response): void => {
  _res.sendFile(path.resolve(__dirname, '../client/dist', 'interactive.html'));
});

app.use(express.static(path.resolve(__dirname, '../client/src/assets')));
app.use(express.static(path.resolve(__dirname, '../client/dist')));

const PORT: string = process.env.PORT || '5000';

app.listen(PORT, (): void => console.log('⚡ Server is running at', PORT));
