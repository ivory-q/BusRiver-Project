import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Route } from './Route';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  person: string;

  @Column()
  time: string;

  @ManyToOne(() => Route, (route) => route.reservations)
  @JoinColumn()
  route: Route | null;
}
