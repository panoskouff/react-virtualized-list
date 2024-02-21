import styles from '#/app/page.module.scss'
import { Suspense } from 'react'
import { FetchAndDisplayProductList } from '#/views/ProductList/FetchAndDisplayProductList'

export default async function HomePage() {
  return (
    <Suspense
      fallback={<div className={styles.loading}>Loading product data...</div>}
    >
      <FetchAndDisplayProductList />
    </Suspense>
  )
}
