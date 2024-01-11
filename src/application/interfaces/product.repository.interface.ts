import { Product } from '@prisma/client';

export interface IProduct {
  findAll(): Promise<Product[]>;
  findOne(id: number): Promise<Product>;
  create(product: Partial<Product>): Promise<Product>;
  update(id: number, pedido: Partial<Product>): Promise<Product>;
  remove(id: number): Promise<void>;
}
