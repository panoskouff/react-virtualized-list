import { ProductRow } from '#/types'
import { useMemo } from 'react'

type UseVisibleRowsParams = {
  dataRows: ProductRow[]
  scrollPosition: number
  cellHeight: number
  gridHeight: number
  bufferRowCount?: number
}

export const useVisibleRows = ({
  dataRows,
  scrollPosition,
  cellHeight,
  gridHeight,
  bufferRowCount = 4,
}: UseVisibleRowsParams) => {
  const amountOfRowsToRenderInclBufferRowCount = useMemo(
    () => Math.floor(gridHeight / cellHeight) + 2 * bufferRowCount,
    [gridHeight, cellHeight, bufferRowCount],
  )
  const scrollContainerHeight = useMemo(
    () => dataRows.length * cellHeight,
    [dataRows.length, cellHeight],
  )

  /* since our component rerenders whenever scrollPosition changes 
    and always produces new visibleRows, memoizing anything related 
    to these values wont have any impact  */
  let startIndex = 0
  const scrollPositionIsTowardsTheTop =
    scrollPosition <= scrollContainerHeight / 2

  if (scrollPositionIsTowardsTheTop) {
    startIndex = Math.max(
      0,
      Math.floor(scrollPosition / cellHeight) - bufferRowCount,
    )
  } else {
    // offset rendered rows to the back
    startIndex =
      Math.floor(scrollPosition / cellHeight) -
      amountOfRowsToRenderInclBufferRowCount +
      bufferRowCount
  }

  const endIndex = Math.min(
    dataRows.length,
    startIndex + amountOfRowsToRenderInclBufferRowCount,
  )

  return dataRows.slice(startIndex, endIndex)
}
