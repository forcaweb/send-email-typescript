import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import router from './router';

const whiteList = [
  'http://localhost:3333',
  'https://www.potiguarminerais.com.br:3333',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(cors(corsOptions));
    this.server.use(helmet());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private router() {
    this.server.use(router);
  }
}
