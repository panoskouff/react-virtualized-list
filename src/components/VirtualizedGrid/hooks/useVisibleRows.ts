import { ProductRow } from '#/types'
import { useMemo } from 'react'

export const useVisibleRows = (
  dataRows: ProductRow[],
  scrollPosition: number,
  cellHeight: number,
  gridHeight: number,
  bufferRowCount = 4,
) => {
  const amountOfRowsToRender = useMemo(
    () => Math.floor(gridHeight / cellHeight) + 2 * bufferRowCount,
    [gridHeight, cellHeight, bufferRowCount],
  )

  /* since our component rerenders whenever scrollPosition changes 
    and always produces new visibleRows, memoizing anything related 
    to these values wont have any impact  */
  const startIndex = Math.max(
    0,
    Math.floor(scrollPosition / cellHeight) - bufferRowCount,
  )

  const endIndex = Math.min(dataRows.length, startIndex + amountOfRowsToRender)

  return dataRows.slice(startIndex, endIndex)
}
