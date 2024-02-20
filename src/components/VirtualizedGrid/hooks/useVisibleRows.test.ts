import { ProductRow } from '#/types'
import { renderHook } from '@testing-library/react'
import { useVisibleRows } from './useVisibleRows'

const amountOfMockedRows = 100

const mockProductRows: ProductRow[] = Array.from(
  { length: amountOfMockedRows },
  (_, i) => ({
    id: i.toString(),
    data: [i.toString(), `Product ${i}`, `Description ${i}`, `${i}`],
  }),
)

const mockGridHeight = 500
const mockCellHeight = 50
const mockBufferRowCount = 4

const amountOfRowsToRender = Math.floor(mockGridHeight / mockCellHeight)

const amountOfRowsToRenderInclBufferRowCount =
  amountOfRowsToRender + 2 * mockBufferRowCount

describe('useVisibleRows', () => {
  it('should return the correct visible rows when scrolled to top', () => {
    const { result } = renderHook(() =>
      useVisibleRows({
        dataRows: mockProductRows,
        scrollPosition: 0,
        cellHeight: mockCellHeight,
        gridHeight: mockGridHeight,
        bufferRowCount: mockBufferRowCount,
      }),
    )

    expect(result.current).toEqual(
      mockProductRows.slice(0, amountOfRowsToRenderInclBufferRowCount),
    )
  })

  it('should return the correct visible rows when scrolled to middle', () => {
    const { result } = renderHook(() =>
      useVisibleRows({
        dataRows: mockProductRows,
        scrollPosition: 2500,
        cellHeight: mockCellHeight,
        gridHeight: mockGridHeight,
        bufferRowCount: mockBufferRowCount,
      }),
    )

    const middle = amountOfMockedRows / 2
    const startIndex = middle - mockBufferRowCount
    const endIndex = middle + amountOfRowsToRender + mockBufferRowCount

    expect(endIndex - startIndex).toBe(amountOfRowsToRenderInclBufferRowCount)
    expect(result.current).toEqual(mockProductRows.slice(startIndex, endIndex))
  })

  it('should return the correct visible rows when scrolled to bottom', () => {
    const { result } = renderHook(() =>
      useVisibleRows({
        dataRows: mockProductRows,
        scrollPosition: 5000,
        cellHeight: mockCellHeight,
        gridHeight: mockGridHeight,
        bufferRowCount: mockBufferRowCount,
      }),
    )

    const startIndex =
      mockProductRows.length -
      amountOfRowsToRenderInclBufferRowCount +
      mockBufferRowCount
    // because we are at the very end the last bufferRowCount will be cut off
    // real endIndex would be mockProductRows.length + mockBufferRowCount
    // but that's out of bounds
    const endIndex = mockProductRows.length

    expect(result.current).toEqual(mockProductRows.slice(startIndex, endIndex))
  })
})
