import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './modules';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(cors());
app.use(helmet());
app.use(
  morgan('[:date[iso]] :remote-addr ":method :url HTTP/:http-version" :status :response-time ms')
);

app.use('/', router);

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send(`[${new Date().toISOString()}] Server failed`);
});

const server = app.listen(port, () => {
  console.log(
    `[${new Date().toISOString()}] Server started (port: ${port}, env: ${process.env.NODE_ENV})`
  );
});

process.on('SIGINT', () => {
  console.log(`[${new Date().toISOString()}] SIGINT signal received, closing server...`);
  server.close(() => {
    console.log(`[${new Date().toISOString()}] Server closed`);
  });
});
