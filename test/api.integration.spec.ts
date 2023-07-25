import * as request from 'supertest';
import { Repository } from 'typeorm';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppModule } from '../src/app.module';
import { Genre } from '../src/genres/genre.entity';
import { Movie } from '../src/movies/movie.entity';

describe('API Integration Tests', () => {
  let app: INestApplication;
  let movieRepository: Repository<Movie>;
  let genreRepository: Repository<Genre>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.db', // Using a test database
          entities: [Movie, Genre],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    movieRepository = moduleFixture.get('MovieRepository');
    genreRepository = moduleFixture.get('GenreRepository');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/movies (GET) should return an array of movies', async () => {
    const response = await request(app.getHttpServer()).get('/movies');
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/movies/:id (GET) should return a single movie', async () => {
    // Create a test movie in the database
    const testMovie: Partial<Movie> = {
      name: 'Test Movie',
      description: 'A test movie',
      releaseDate: Date.now(),
      duration: 120,
      rating: 4,
    };

    const createdMovie = await movieRepository.save(
      movieRepository.create(testMovie),
    );

    const response = await request(app.getHttpServer()).get(
      `/movies/${createdMovie.id}`,
    );
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(testMovie);
  });

  it('/genres (GET) should return an array of genres', async () => {
    const response = await request(app.getHttpServer()).get('/genres');
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/genres/:id (GET) should return a single genre', async () => {
    // Create a test genre in the database
    const testGenre: Partial<Genre> = {
      name: 'Test Genre',
      description: 'A test genre',
    };
    const createdGenre = await genreRepository.save(
      genreRepository.create(testGenre),
    );

    const response = await request(app.getHttpServer()).get(
      `/genres/${createdGenre.id}`,
    );
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject(testGenre);
  });
});
