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

  @Column()
  seat: number;

  @ManyToOne(() => Route, (route) => route.reservations, {
    onDelete: 'CASCADE', onUpdate:"CASCADE"
  })
  @JoinColumn()
  route: Route | null;
}
