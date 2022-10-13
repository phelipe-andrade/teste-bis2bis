import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import helmet from 'helmet';

import './db/DB.js';
import routeUniversities from './routes/universities.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/universities', routeUniversities);
    this.app.use((req, res, next) => {
      res.status(404).send({ error: 'Rota inválida' });
      next();
    });
  }
}

export default new App().app;
