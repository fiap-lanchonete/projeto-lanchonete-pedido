import { Product } from './product';

namespace Order {
  interface Data {
    id?: number;
    total?: number;
    user_id: number;
    products?: Partial<Product.Data>[];
    createdAt: Date;
    updatedAt: Date;
  }
}
