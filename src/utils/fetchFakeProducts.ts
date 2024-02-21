import { faker } from '@faker-js/faker'
import { ProductRow } from '#/types'

/* we use only 50000 rows in production since vercel blocks
our deployment since our response is higher than 10mb 
https://vercel.com/docs/errors/FALLBACK_BODY_TOO_LARGE */

const isProduction = process.env.NODE_ENV === 'production'
const initialLength = isProduction ? 50_000 : 200_000

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
