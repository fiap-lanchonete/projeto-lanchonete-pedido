import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaHelper } from 'src/adapters/database/helpers/prisma.helper';
import { useContainer } from 'class-validator';

describe('OrderController (e2e)', () => {
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
    price: 50,
    category_id: 2,
  };

  const mockedOrder = {
    id: 1,
    idempotent_key: '333',
    total: 1,
    cpf: '12345678909',
    createdAt: new Date(),
    updatedAt: new Date(),
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

    await prisma.order.create({
      data: mockedOrder,
    });
    await prisma.category.create({
      data: mockedCategory,
    });
    await prisma.product.create({
      data: mockedProduct,
    });
  });

  it('/v1/order/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/v1/order/${mockedOrder.idempotent_key}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.id).toEqual(mockedOrder.id);
        expect(response.body.id).toBeDefined();
        expect(response.body.cpf).toEqual(mockedOrder.cpf);
      });
  });

  it('/v1/order/:idempotent_key (PUT)', () => {
    const mockedOrderToUpdate = {
      products: [
        {
          id: mockedProduct.id,
        },
      ],
    };

    return request(app.getHttpServer())
      .put(`/v1/order/${mockedOrder.idempotent_key}`)
      .send(mockedOrderToUpdate)
      .expect(200)
      .expect((response) => {
        expect(response.body.id).toBeDefined();
      });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.order.deleteMany();
    await app.close();
  });
});
