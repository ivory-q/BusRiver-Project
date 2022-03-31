import { In } from 'typeorm';
import { Car } from '../models/Car';
import { Route } from '../models/Route';

export class RouteService {
  constructor() {}

  public index = async (routeId?: number) => {
    let routes;
    if (routeId) {
      routes = await Route.find({
        where: { id: routeId },
        relations: { cars: true },
      });
    } else {
      routes = await Route.find({ relations: { cars: true } });
    }
    return routes;
  };

  public create = async (route: Route, cars: number[]) => {
    route.cars = await Car.find({ where: { id: In(cars) } });
    const newRoute = await Route.save(route);
    return newRoute;
  };

  public update = async (routeId: number, newRoute: Route, cars?: number[]) => {
    if (cars) {
      newRoute.cars = await Car.find({ where: { id: In(cars) } });
    }
    const modRoute = await Route.update({ id: routeId }, newRoute);
    return modRoute;
  };

  public delete = async (routeId: number) => {
    const delRoute = await Route.delete({ id: routeId });
    return delRoute;
  };
}
