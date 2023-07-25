import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(+id);
  }

  @Post()
  async create(@Body() movieData: Partial<Movie>): Promise<Movie> {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.moviesService.remove(+id);
  }
}
