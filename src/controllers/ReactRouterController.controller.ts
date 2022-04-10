import { Router, Request, Response } from 'express';
import path from 'path';

export default class ReactRouterController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * index
   */
  public index = async (_req: Request, _res: Response) => {
    _res.sendFile(
      path.resolve(__dirname, '../../client/dist', 'interactive.html')
    );
  };

  /**
   * routes
   */
  public routes() {
    this.router.get('/', this.index);
  }
}
