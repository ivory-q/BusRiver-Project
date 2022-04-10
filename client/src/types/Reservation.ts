import { Route } from './Route';

export interface Reservation {
  id?: number;
  person: string;
  time: string;
  seat: number;
  route: Route | null;
}
