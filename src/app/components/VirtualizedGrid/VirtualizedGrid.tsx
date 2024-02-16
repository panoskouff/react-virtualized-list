import styles from './VirtualizedGrid.module.scss'
import { classNames } from '#/utils'

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

  const itemAmountPerRow = data[0].length

  return (
    <div
      className={styles.container}
      style={{ width: itemAmountPerRow * cellWidth }}
    >
      {data.map((item, index) =>
        item.map((text, index2) => {
          const isFirstRowItem = index === 0
          const isFirstColumnItem = index2 === 0

          return (
            <div
              key={index2}
              className={classNames(
                styles.gridItem,
                isFirstRowItem ? styles.firstRowItem : undefined,
                isFirstColumnItem ? styles.firstColumnItem : undefined,
              )}
              style={{
                width: cellWidth,
                height: cellHeight,
                top: index * cellHeight,
                left: index2 * cellWidth,
              }}
            >
              <div className={styles.textContainer}>{text}</div>
            </div>
          )
        }),
      )}
    </div>
  )
}

//
