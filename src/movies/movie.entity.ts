import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Genre } from '../genres/genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  releaseDate: number;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @Column()
  duration: number;

  @Column()
  rating: number;
}
