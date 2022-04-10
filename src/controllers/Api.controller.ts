import { Router } from 'express';

import CarController from './Car.controller';
import RouteController from './Route.controller';
import ReservationController from './Reservation.controller';
import AdminController from './Admin.controller';

export default class ApiController {
  public router: Router;

  private CarController: CarController;
  private RouteController: RouteController;
  private ReservationController: ReservationController;
  private AdminController: AdminController;

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
    this.AdminController = new AdminController();

    this.router.use('/car', this.CarController.router);
    this.router.use('/route', this.RouteController.router);
    this.router.use('/reservation', this.ReservationController.router);
    this.router.use('/admin', this.AdminController.router);
  }
}
