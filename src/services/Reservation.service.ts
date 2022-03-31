import { In } from 'typeorm';
import { Route } from '../models/Route';
import { Reservation } from '../models/Reservation';

export class ReservationService {
  constructor() {}

  public index = async (reservationId?: number) => {
    let reservations;
    if (reservationId) {
      reservations = await Reservation.find({
        where: { id: reservationId },
        relations: { route: true },
      });
    } else {
      reservations = await Reservation.find({ relations: { route: true } });
    }
    return reservations;
  };

  public create = async (reservation: Reservation, routeId: number) => {
    reservation.route = await Route.findOne({ where: { id: routeId } });
    const newReservation = await Reservation.save(reservation);
    return newReservation;
  };

  public update = async (
    reservationId: number,
    newReservation: Reservation,
    newRoute?: number
  ) => {
    if (newRoute) {
      newReservation.route = await Route.findOne({ where: { id: newRoute } });
    }
    const modReservation = await Route.update(
      { id: reservationId },
      newReservation
    );
    return modReservation;
  };

  public delete = async (reservationId: number) => {
    const delReservation = await Reservation.delete({ id: reservationId });
    return delReservation;
  };
}
