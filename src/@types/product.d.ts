/* eslint-disable @typescript-eslint/no-unused-vars */
import { Decimal } from '@prisma/client/runtime/library';

namespace Product {
  interface Data {
    id?: number;
    name: string;
    price: Decimal | any;
    description: string;
    amount: number;
    category_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
}
