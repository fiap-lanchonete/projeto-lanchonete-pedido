import { Decimal } from '@prisma/client/runtime/library';
import { Product } from './product';

namespace Order {
  interface Data {
    id?: number;
    total?: Decimal;
    user_id: number;
    products?: Partial<Product.Data>[];
    createdAt: Date;
    updatedAt: Date;
  }
}
