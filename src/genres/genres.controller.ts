import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { Genre } from './genre.entity';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  async findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Genre> {
    return this.genresService.findOne(+id);
  }

  @Post()
  async create(@Body() genreData: Partial<Genre>): Promise<Genre> {
    return this.genresService.create(genreData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.genresService.remove(+id);
  }
}
