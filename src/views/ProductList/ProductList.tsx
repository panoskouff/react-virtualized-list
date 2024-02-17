'use client'
import styles from './ProductList.module.scss'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { VirtualizedGrid } from '../../components/VirtualizedGrid/VirtualizedGrid'
import { useState } from 'react'
import { AddProductModal } from '#/components/AddProductModal/AddProductModal'
import { Button } from '#/components/Button/Button'

type Props = {
  data: { id: string; data: string[] }[]
}

export function ProductList({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const openDialog = () => setIsOpen(true)

  return (
    <PageWrapper>
      <div className={styles.spacing}>
        <div className={styles.flex}>
          <div className={styles.spacer} />
          <div className={styles.title}>Virtualized list</div>
          <Button onClick={openDialog}>Add new item</Button>
        </div>
      </div>

      <AddProductModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={styles.centerGrid}>
        <VirtualizedGrid
          dataRows={data}
          gridWidth={620}
          gridHeight={700}
          cellWidth={200}
          cellHeight={74}
        />
      </div>
    </PageWrapper>
  )
}
