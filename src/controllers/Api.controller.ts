import { Router } from 'express';

import CarController from './Car.controller';
import RouteController from './Route.controller';
import ReservationController from './Reservation.controller';

export default class ApiController {
  public router: Router;

  private CarController: CarController;
  private RouteController: RouteController;
  private ReservationController: ReservationController;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * routes
   */
  public routes() {
    this.CarController = new CarController();
    this.RouteController = new RouteController();
    this.ReservationController = new ReservationController();

    this.router.use('/car', this.CarController.router);
    this.router.use('/route', this.RouteController.router);
    this.router.use('/reservation', this.ReservationController.router);
  }
}
