import { Car } from './Car';

export interface Route {
  id?: number;
  badge?: string;
  cars: Array<Car>;
  date: string;
  from: string;
  to: string;
  price: number;
  time: string;
}
