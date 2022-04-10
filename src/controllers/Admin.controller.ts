import { Router, Request, Response } from 'express';
import path from 'path';
import { AdminService } from '../services/Admin.service';

export default class AdminController {
  public router: Router;

  private AdminService: AdminService;

  constructor() {
    this.router = Router();
    this.AdminService = new AdminService();
    this.routes();
  }

  /**
   * index
   */
  public index = async (_req: Request, _res: Response) => {
    _res.sendFile(path.resolve(__dirname, '../../client/dist', 'admin.html'));
  };

  /**
   * login
   */
  public login = async (_req: Request, _res: Response) => {
    const result = await this.AdminService.login(_req.body.name, _req.body.pwd);
    _res.json(result);
  };

  /**
   * routes
   */
  public routes() {
    this.router.get('/', this.index);
    this.router.post('/login', this.login);
  }
}
