import styles from './FixedGridItem.module.scss'

type Props = {
  children: React.ReactNode
  isHeader?: boolean
}

export const FixedGridItem: React.FC<Props> = ({ children, isHeader }) => (
  <div
    className={`${styles.gridItem} ${isHeader ? styles.headerItem : ''}`.trim()}
  >
    <div
      className={`${styles.textContainer} ${isHeader ? styles.headerText : ''}`.trim()}
    >
      {children}
    </div>
  </div>
)
