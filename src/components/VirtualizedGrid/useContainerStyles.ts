import { CSSProperties, useMemo } from 'react'
import { ProductRow } from '#/types'

type UseContainerStylesProps = {
  gridWidth: number
  gridHeight: number
  dataRows: ProductRow[]
  cellWidth: number
  cellHeight: number
}

export const useContainerStyles = ({
  gridWidth,
  gridHeight,
  dataRows,
  cellWidth,
  cellHeight,
}: UseContainerStylesProps): {
  scrollContainerStyle: CSSProperties
  expandedScrollContainerStyle: CSSProperties
} => {
  return useMemo(
    () => ({
      scrollContainerStyle: {
        width: gridWidth,
        height: gridHeight,
        overflow: 'auto',
      },
      expandedScrollContainerStyle: {
        width: dataRows[0] ? dataRows[0].data.length * cellWidth : 0,
        height: dataRows.length * cellHeight,
        position: 'relative',
      },
    }),
    [gridWidth, gridHeight, dataRows, cellHeight, cellWidth],
  )
}
