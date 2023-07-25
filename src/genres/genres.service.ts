import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Genre } from './genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    return this.genreRepository.findOne({ where: { id } });
  }

  async create(genreData: Partial<Genre>): Promise<Genre> {
    const genre = this.genreRepository.create(genreData);
    return this.genreRepository.save(genre);
  }

  async remove(id: number): Promise<void> {
    await this.genreRepository.delete(id);
  }
}
