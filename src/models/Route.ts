import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './Car';
import { Reservation } from './Reservation';

@Entity()
export class Route extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  badge: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  popularity: number;

  @OneToMany(() => Reservation, (reservation) => reservation.route, {
    cascade: true,
  })
  reservations: Reservation[];

  @ManyToMany(() => Car, { cascade: true })
  @JoinTable()
  cars: Car[];
}
