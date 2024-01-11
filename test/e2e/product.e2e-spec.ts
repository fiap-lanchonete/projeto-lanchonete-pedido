import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { AppModule } from 'src/app.module';
import { useContainer } from 'class-validator';

describe('Product Controller (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaHelper;

  const mockedCategory = {
    id: 2,
    name: 'Test Category 2',
  };

  const mockedProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    amount: 0,
    price: '1.0',
    category_id: 2,
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

    await prisma.product.create({
      data: mockedProduct,
    });
  });

  it('/v1/product (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/product')
      .expect(200)
      .expect((response) => {
        expect(response.body[0].name).toEqual(mockedProduct.name);
        expect(response.body[0].id).toBeDefined();
      });
  });

  it('/v1/product/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/v1/product/1`)
      .expect(200)
      .expect((response) => {
        expect(response.body.name).toEqual(mockedProduct.name);
        expect(response.body.id).toBeDefined();
      });
  });

  it('/v1/product/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/v1/product/${mockedProduct.id}`)
      .expect(204);
  });

  it('/v1/product (POST)', () => {
    const mockedProductToCreate = {
      id: 2,
      name: 'Test Product Post',
      description: 'Test Description 2',
      amount: 0,
      price: '12.34',
      category_id: 2,
    };

    return request(app.getHttpServer())
      .post('/v1/product')
      .send(mockedProductToCreate)
      .expect(201)
      .expect((response) => {
        expect(response.body.name).toEqual(mockedProductToCreate.name);
        expect(response.body.id).toBeDefined();
      });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await app.close();
  });
});
