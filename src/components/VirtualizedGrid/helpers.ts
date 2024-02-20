import { CSSProperties } from 'react'

type CalculateGridItemPropsParams = {
  rowIndex: number
  columnIndex: number
  scrollPosition: number
  cellHeight: number
  cellWidth: number
  bufferRowCount: number
}

export const calculateGridItemProps = ({
  rowIndex,
  columnIndex,
  scrollPosition,
  cellHeight,
  cellWidth,
  bufferRowCount,
}: CalculateGridItemPropsParams): {
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
