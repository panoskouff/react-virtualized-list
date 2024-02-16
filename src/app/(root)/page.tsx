import styles from './home.module.scss'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { VirtualizedGrid } from '../../components/VirtualizedGrid/VirtualizedGrid'

const data = Array.from({ length: 100 * 1000 }).map((_, index) => [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, incidunt! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, atque!',
  'Some Description',
  index.toString(),
])

export default function HomePage() {
  return (
    <PageWrapper>
      <div className={styles.spacing}>
        <div className={styles.flex}>
          <div className={styles.spacer} />
          <div className={styles.title}>Virtualized list</div>
          <button className={styles.addButton} type='button'>
            Add new item
          </button>
        </div>
      </div>

      <div className={styles.centerGrid}>
        <VirtualizedGrid
          data={data}
          gridWidth={620}
          gridHeight={700}
          cellWidth={200}
          cellHeight={74}
        />
      </div>
    </PageWrapper>
  )
}
