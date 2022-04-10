import express, { Application, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import { DataSource } from 'typeorm';

import ReactRouterController from './controllers/ReactRouterController.controller';
import ApiController from './controllers/Api.controller';
import AdminController from './controllers/Admin.controller';

import { Car } from './models/Car';
import { Route } from './models/Route';
import { Reservation } from './models/Reservation';
import { Admin } from './models/Admin';

class Server {
  private app: Application;
  private PORT: string;
  public AppDataSource: DataSource;

  private ReactRouterController: ReactRouterController;
  private ApiController: ApiController;
  private AdminController: AdminController;

  constructor() {
    this.app = express();
    this.configuration();
    this.middleware();
    this.routes();
  }

  /**
   * configuration
   */
  public async configuration() {
    dotenv.config();
    this.PORT = process.env.PORT || '5000';

    this.AppDataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'busriver',
      synchronize: true,
      entities: [Route, Reservation, Car, Admin],
    });

    await this.AppDataSource.initialize()
      .then(() => {
        console.log('DB connected...');
      })
      .catch((error) => console.log(error));
  }

  /**
   * middleware
   */
  public middleware() {
    this.app.use(logger('dev'));

    this.app.use(
      express.json({
        type: ['application/json', 'text/plain'],
      })
    );
    this.app.use(express.urlencoded({ extended: false }));
  }

  /**
   * routes
   */
  public routes() {
    this.ReactRouterController = new ReactRouterController();
    this.ApiController = new ApiController();
    this.AdminController = new AdminController();

    this.app.use('/api', this.ApiController.router);
    
    this.app.use('/admin/*', this.AdminController.router);

    this.app.get('/admin', async (_req: Request, _res: Response): Promise<void> => {
      _res.sendFile(path.resolve(__dirname, '../client/dist', 'admin.html'));
    });

    this.app.get('/', async (_req: Request, _res: Response): Promise<void> => {
      _res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });

    this.app.use(
      express.static(path.resolve(__dirname, '../client/src/assets'))
    );
    this.app.use(express.static(path.resolve(__dirname, '../client/dist')));

    this.app.use('/*', this.ReactRouterController.router);
  }

  /**
   * start
   */
  public start() {
    this.app.listen(this.PORT, (): void =>
      console.log('⚡ Server is running at', this.PORT)
    );
  }
}

export const server = new Server();
server.start();
