import { ProductList } from '#/views/ProductList/ProductList'
import styles from '#/app/page.module.scss'
import { Suspense } from 'react'
import { fetchFakeProducts } from '#/utils'

export async function FetchAndDisplayProductList() {
  const products = await fetchFakeProducts()
  return <ProductList products={products} />
}

export default async function HomePage() {
  return (
    <Suspense
      fallback={<div className={styles.loading}>Loading product data...</div>}
    >
      <FetchAndDisplayProductList />
    </Suspense>
  )
}
