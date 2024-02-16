import styles from './VirtualizedGrid.module.scss'

type Props = {
  data: string[][]
  cellWidth: number
  cellHeight: number
}

export const VirtualizedGrid: React.FC<Props> = ({
  data,
  cellHeight,
  cellWidth,
}) => {
  console.log('render')

  return (
    <div className={styles.container}>
      {data.map((item, index) =>
        item.map((text, index2) => (
          <div
            key={index2}
            className={styles.gridItem}
            style={{
              width: cellWidth,
              height: cellHeight,
              top: index * cellHeight,
              left: index2 * cellWidth,
            }}
          >
            {text}
          </div>
        )),
      )}
    </div>
  )
}
