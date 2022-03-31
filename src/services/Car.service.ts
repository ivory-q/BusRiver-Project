import { Car } from '../models/Car';

export class CarService {
  constructor() {}

  public index = async (carId?: number) => {
    let cars;
    if (carId) {
      cars = await Car.find({ where: { id: carId } });
    } else {
      cars = await Car.find();
    }
    return cars;
  };

  public create = async (post: Car) => {
    const newCar = await Car.save(post);
    return newCar;
  };

  public update = async (carId: number, newCar: Car) => {
    const modCar = await Car.update({ id: carId }, newCar);
    return modCar;
  };

  public delete = async (carId: number) => {
    const delCar = await Car.delete({ id: carId });
    return delCar;
  };
}
