import styles from '#/app/page.module.scss'
import { Suspense } from 'react'
import { FetchAndDisplayProductList } from '#/views/ProductList/FetchAndDisplayProductList'

import { unstable_noStore as noStore } from 'next/cache'

export default async function HomePage() {
  noStore()

  return (
    <Suspense
      fallback={<div className={styles.loading}>Loading product data...</div>}
    >
      <FetchAndDisplayProductList />
    </Suspense>
  )
}
