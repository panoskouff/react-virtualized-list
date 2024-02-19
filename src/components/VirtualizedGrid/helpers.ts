import { CSSProperties } from 'react'

export const calculateGridItemProps = (
  rowIndex: number,
  columnIndex: number,
  scrollPosition: number,
  cellHeight: number,
  cellWidth: number,
  bufferRowCount: number,
): {
  isFirstRowItem: boolean
  isFirstColumnItem: boolean
  gridItemStyle: CSSProperties
} => {
  const actualStartIndex = Math.max(
    0,
    Math.floor(scrollPosition / cellHeight) - bufferRowCount,
  )
  const top = (rowIndex + actualStartIndex) * cellHeight
  const left = columnIndex * cellWidth

  const isFirstRowItem = rowIndex === 0 && actualStartIndex === 0
  const isFirstColumnItem = columnIndex === 0

  return {
    isFirstRowItem,
    isFirstColumnItem,
    gridItemStyle: {
      width: cellWidth,
      height: cellHeight,
      position: 'absolute',
      top,
      left,
    },
  }
}
