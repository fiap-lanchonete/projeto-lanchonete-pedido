import { Product } from './product';

namespace Order {
  interface Data {
    name?: string;
    idempotent_key?: string;
    id?: number;
    total?: number;
    email?: string;
    cpf?: string;
    products?: Partial<Product.Data>[];
    createdAt: Date;
    updatedAt: Date;
  }
}
