import { faker } from '@faker-js/faker'
import { ProductRow } from '#/types'

const initialLength = 100_000

const products: ProductRow[] = Array.from(
  { length: initialLength },
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
