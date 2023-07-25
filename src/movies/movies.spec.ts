import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Movie } from './movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useClass: class MockRepository {},
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a movie with genres', async () => {
    const movie: Movie = {
      id: 1,
      name: 'Movie A',
      description: 'A great movie',
      releaseDate: Date.now(),
      genres: [{ id: 1, name: 'Action', description: 'Action genre' }],
      duration: 120,
      rating: 4.5,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(movie);

    expect(await controller.findOne('1')).toBe(movie);
  });
});
