import { Router, Request, Response } from 'express';
import { Reservation } from '../models/Reservation';
import { Route } from '../models/Route';

import { ReservationService } from '../services/Reservation.service';

export default class ReservationController {
  public router: Router;

  private ReservationService: ReservationService;

  constructor() {
    this.router = Router();
    this.ReservationService = new ReservationService();
    this.routes();
  }

  /**
   * index
   */
  public index = async (_req: Request, _res: Response) => {
    const reservations = await this.ReservationService.index(+_req.body.id);
    _res.json(reservations);
  };

  /**
   * seats
   */
  public seats = async (_req: Request, _res: Response) => {
    const reservations = await this.ReservationService.seats(_req.body.routeId);
    _res.json(reservations);
  };

  /**
   * create
   */
  public create = async (_req: Request, _res: Response) => {
    const reservation = _req.body.reservation as Reservation;
    const route = _req.body.routeId;
    const newReservation = await this.ReservationService.create(
      reservation,
      route
    );
    _res.send(newReservation);
  };

  /**
   * update
   */
  public update = async (_req: Request, _res: Response) => {
    const newReservation = _req.body.reservation as Reservation;
    const newRoute = _req.body.routeId;
    const modReservation = await this.ReservationService.update(
      +_req.body.id,
      newReservation,
      newRoute
    );
    _res.json(modReservation);
  };

  /**
   * delete
   */
  public delete = async (_req: Request, _res: Response) => {
    const delReservation = await this.ReservationService.delete(+_req.body.id);
    _res.json(delReservation);
  };

  /**
   * routes
   */
  public routes() {
    this.router.post('/get', this.index);
    this.router.post('/seats', this.seats);
    this.router.post('/create', this.create);
    this.router.put('/update', this.update);
    this.router.delete('/delete', this.delete);
  }
}
