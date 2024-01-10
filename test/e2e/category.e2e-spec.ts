import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { useContainer } from 'class-validator';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaHelper;

  const mockedCategory = {
    id: 1,
    name: 'Test Category',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaHelper>(PrismaHelper);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();

    await prisma.category.create({
      data: mockedCategory,
    });
  });

  describe('CategoryController (e2e)', () => {
    it('/v1/category (GET)', () => {
      return request(app.getHttpServer())
        .get('/v1/category')
        .expect(200)
        .expect((response) => {
          expect(response.body[0].name).toEqual(mockedCategory.name);
          expect(response.body[0].id).toBeDefined();
        });
    });

    it('/v1/category/:id (GET)', () => {
      return request(app.getHttpServer())
        .get(`/v1/category/1`)
        .expect(200)
        .expect((response) => {
          expect(response.body.name).toEqual(mockedCategory.name);
          expect(response.body.id).toBeDefined();
        });
    });

    it('/v1/category/:id (DELETE)', () => {
      return request(app.getHttpServer())
        .delete(`/v1/category/${mockedCategory.id}`)
        .expect(204);
    });

    it('/v1/category (POST)', () => {
      const mockedCategoryToCreate = {
        name: 'Test Category Post',
      };

      return request(app.getHttpServer())
        .post('/v1/category')
        .send(mockedCategoryToCreate)
        .expect(201)
        .expect((response) => {
          expect(response.body.name).toEqual(mockedCategoryToCreate.name);
          expect(response.body.id).toBeDefined();
        });
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await prisma.category.deleteMany();
  });
});
