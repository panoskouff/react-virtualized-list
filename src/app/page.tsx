import { ProductList } from '#/views/ProductList/ProductList'
import styles from '#/app/page.module.scss'
import { faker } from '@faker-js/faker'
import { Suspense } from 'react'
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

async function fetchProducts(): Promise<ProductRow[]> {
  return products
}

async function ProductListWithSuspense() {
  const products = await fetchProducts()
  return <ProductList products={products} />
}

export default async function HomePage() {
  return (
    <Suspense
      fallback={<div className={styles.loading}>Loading product data...</div>}
    >
      <ProductListWithSuspense />
    </Suspense>
  )
}
