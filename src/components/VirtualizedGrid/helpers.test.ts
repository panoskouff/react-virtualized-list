import { calculateGridItemProps } from './helpers'

describe('calculateGridItemProps', () => {
  const mockCellHeight = 50
  const mockCellWidth = 100
  const mockBufferRowCount = 4

  it('should return the correct properties for the first row and column', () => {
    const result = calculateGridItemProps({
      rowIndex: 0,
      columnIndex: 0,
      scrollPosition: 0 * mockCellHeight,
      cellHeight: mockCellHeight,
      cellWidth: mockCellWidth,
      bufferRowCount: mockBufferRowCount,
    })

    expect(result).toEqual({
      isFirstRowItem: true,
      isFirstColumnItem: true,
      gridItemStyle: {
        width: mockCellWidth,
        height: mockCellHeight,
        position: 'absolute',
        top: 0,
        left: 0,
      },
    })
  })

  it('should return the correct properties when scrolled', () => {
    // for cell 1,1
    const result = calculateGridItemProps({
      rowIndex: 1,
      columnIndex: 1,
      scrollPosition: 1 * mockCellHeight,
      cellHeight: mockCellHeight,
      cellWidth: mockCellWidth,
      bufferRowCount: mockBufferRowCount,
    })

    expect(result).toEqual({
      isFirstRowItem: false,
      isFirstColumnItem: false,
      gridItemStyle: {
        width: mockCellWidth,
        height: mockCellHeight,
        position: 'absolute',
        top: 1 * mockCellHeight,
        left: 1 * mockCellWidth,
      },
    })

    // for cell 2,2
    const result2 = calculateGridItemProps({
      rowIndex: 2,
      columnIndex: 2,
      scrollPosition: 2 * mockCellHeight,
      cellHeight: mockCellHeight,
      cellWidth: mockCellWidth,
      bufferRowCount: mockBufferRowCount,
    })

    expect(result2).toEqual({
      isFirstRowItem: false,
      isFirstColumnItem: false,
      gridItemStyle: {
        width: mockCellWidth,
        height: mockCellHeight,
        position: 'absolute',
        top: 2 * mockCellHeight,
        left: 2 * mockCellWidth,
      },
    })
  })
})
