import { Product } from './product';

namespace Order {
  interface Data {
    idempotent_key?: string;
    id?: number;
    total?: number;
    cpf?: string;
    products?: Partial<Product.Data>[];
    createdAt: Date;
    updatedAt: Date;
  }
}
