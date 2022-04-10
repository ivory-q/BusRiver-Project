import { Router, Request, Response } from 'express';
import { Car } from '../models/Car';
import { Route } from '../models/Route';

import { RouteService } from '../services/Route.service';

export default class RouteController {
  public router: Router;

  private RouteService: RouteService;

  constructor() {
    this.router = Router();
    this.RouteService = new RouteService();
    this.routes();
  }

  /**
   * index
   */
  public index = async (_req: Request, _res: Response) => {
    const routes = await this.RouteService.index(+_req.body.id);
    _res.json(routes);
  };

  /**
   * options
   */
  public options = async (_req: Request, _res: Response) => {
    const routes = await this.RouteService.options();
    _res.json(routes);
  };

  /**
   * search
   */
  public search = async (_req: Request, _res: Response) => {
    const routes = await this.RouteService.search({
      from: _req.body.from,
      to: _req.body.to,
      date: _req.body.date,
      pass: _req.body.pass,
    });
    _res.json(routes);
  };

  /**
   * create
   */
  public create = async (_req: Request, _res: Response) => {
    const route = _req.body.route as Route;
    const cars = _req.body.carsIds;
    console.log(route);
    console.log(cars);
    const newRoute = await this.RouteService.create(route, cars);
    _res.send(newRoute);
  };

  /**
   * update
   */
  public update = async (_req: Request, _res: Response) => {
    const newRoute = _req.body.route as Route;
    const cars = _req.body.carsIds;
    const modRoute = await this.RouteService.update(
      +_req.body.id,
      newRoute,
      cars
    );
    _res.json(modRoute);
  };

  /**
   * delete
   */
  public delete = async (_req: Request, _res: Response) => {
    const delRoute = await this.RouteService.delete(+_req.body.id);
    _res.json(delRoute);
  };

  /**
   * routes
   */
  public routes() {
    this.router.get('/get', this.index);
    this.router.get('/options', this.options);
    this.router.post('/search', this.search);
    this.router.post('/create', this.create);
    this.router.put('/update', this.update);
    this.router.delete('/delete', this.delete);
  }
}
