import { renderHook } from '@testing-library/react'
import { useContainerStyles } from './useContainerStyles'
import { ProductRow } from '#/types'

const mockGridWidth = 500
const mockGridHeight = 600
const mockCellWidth = 50
const mockCellHeight = 60

const mockDataRows: ProductRow[] = Array.from({ length: 100 }, (_, i) => ({
  id: i.toString(),
  data: [i.toString(), `Product ${i}`, `Description ${i}`, `${i}`],
}))

describe('useContainerStyles', () => {
  it('should return the correct styles', () => {
    const { result } = renderHook(() =>
      useContainerStyles({
        gridWidth: mockGridWidth,
        gridHeight: mockGridHeight,
        dataRows: mockDataRows,
        cellWidth: mockCellWidth,
        cellHeight: mockCellHeight,
      }),
    )

    expect(result.current).toEqual({
      scrollContainerStyle: {
        width: mockGridWidth,
        height: mockGridHeight,
      },
      expandedScrollContainerStyle: {
        width: mockDataRows[0].data.length * mockCellWidth,
        height: mockDataRows.length * mockCellHeight,
        position: 'relative',
      },
    })
  })

  it('should return a sane value if dataRows is empty', () => {
    const { result } = renderHook(() =>
      useContainerStyles({
        gridWidth: mockGridWidth,
        gridHeight: mockGridHeight,
        dataRows: [],
        cellWidth: mockCellWidth,
        cellHeight: mockCellHeight,
      }),
    )

    expect(result.current).toEqual({
      scrollContainerStyle: { width: mockGridWidth, height: mockGridHeight },
      expandedScrollContainerStyle: {
        width: 0,
        height: 0,
        position: 'relative',
      },
    })
  })
})
