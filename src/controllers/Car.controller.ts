import { Router, Request, Response } from 'express';
import { Car } from '../models/Car';

import { CarService } from '../services/Car.service';

export default class CarController {
  public router: Router;

  private CarService: CarService;

  constructor() {
    this.router = Router();
    this.CarService = new CarService();
    this.routes();
  }

  /**
   * index
   */
  public index = async (_req: Request, _res: Response) => {
    const cars = await this.CarService.index(+_req.body.id);
    _res.json(cars);
  };

  /**
   * create
   */
  public create = async (_req: Request, _res: Response) => {
    const car = _req.body as Car;
    const newCar = await this.CarService.create(car);
    _res.send(newCar);
  };

  /**
   * update
   */
  public update = async (_req: Request, _res: Response) => {
    const newCar = _req.body as Car;
    const modCar = await this.CarService.update(+_req.body.id, newCar);
    _res.json(modCar);
  };

  /**
   * delete
   */
  public delete = async (_req: Request, _res: Response) => {
    const delCar = await this.CarService.delete(+_req.body.id);
    _res.json(delCar);
  };

  /**
   * routes
   */
  public routes() {
    this.router.get('/get', this.index);
    this.router.post('/create', this.create);
    this.router.put('/update', this.update);
    this.router.delete('/delete', this.delete);
  }
}
