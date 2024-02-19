import React from 'react'
import styles from './GridItem.module.scss'
import { classNames } from '#/utils'

type GridItemProps = {
  text: string
  style: React.CSSProperties
  isFirstRowItem: boolean
  isFirstColumnItem: boolean
}

export const GridItem: React.FC<GridItemProps> = ({
  text,
  style,
  isFirstRowItem,
  isFirstColumnItem,
}) => (
  <div
    className={classNames(
      styles.gridItem,
      isFirstRowItem ? styles.firstRowItem : undefined,
      isFirstColumnItem ? styles.firstColumnItem : undefined,
    )}
    style={style}
  >
    <div className={styles.textContainer}>{text}</div>
  </div>
)
