'use client'
import styles from './ProductList.module.scss'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { VirtualizedGrid } from '../../components/VirtualizedGrid/VirtualizedGrid'
import { useState } from 'react'
import { AddProductModal } from '#/components/AddProductModal/AddProductModal'
import { Button } from '#/components/Button/Button'
import { ProductRow } from '#/types'

type Props = {
  products: ProductRow[]
}

export function ProductList({ products }: Props) {
  const [productRows, setProductRows] = useState(products)
  const [isOpen, setIsOpen] = useState(false)
  const openDialog = () => setIsOpen(true)

  const addProduct = (product: ProductRow, addToTheStart: boolean) => {
    if (addToTheStart) {
      setProductRows([product, ...productRows])
    } else {
      setProductRows([...productRows, product])
    }
  }

  return (
    <PageWrapper>
      <div className={styles.spacing}>
        <div className={styles.flex}>
          <div className={styles.spacer} />
          <div className={styles.title}>Virtualized list</div>
          <Button onClick={openDialog}>Add new item</Button>
        </div>
      </div>

      <AddProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addProduct={addProduct}
      />

      <div className={styles.centerGrid}>
        <VirtualizedGrid
          dataRows={productRows}
          gridWidth={820}
          gridHeight={700}
          cellWidth={200}
          cellHeight={74}
        />
      </div>
    </PageWrapper>
  )
}
