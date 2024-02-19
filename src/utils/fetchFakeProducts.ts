import { faker } from '@faker-js/faker'
import { ProductRow } from '#/types'

const products: ProductRow[] = Array.from(
  { length: 100 * 1000 },
  (_, index) => ({
    id: faker.string.uuid(),
    data: [
      `Item ${index + 1}`,
      faker.commerce.productName(),
      faker.commerce.productDescription(),
      `${faker.commerce.price()}€`,
    ],
  }),
)

export async function fetchFakeProducts(): Promise<ProductRow[]> {
  return products
}
