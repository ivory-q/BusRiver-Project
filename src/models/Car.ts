import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from './Route';

@Entity()
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  seats: number;

  @ManyToMany(() => Route, route => route.cars)
  car: Car[];
}
