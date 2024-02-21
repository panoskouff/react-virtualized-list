import { render, screen } from '@testing-library/react'
import { VirtualizedGridContainer } from './VirtualizedGridContainer'
import { ProductRow } from '#/types'
import React from 'react'

var MockGridItem: jest.Mock
jest.mock('./GridItem', () => {
  MockGridItem = jest.fn(() => <div>[GridItem]</div>)
  return { GridItem: MockGridItem }
})

var MockVirtualizedGrid: jest.Mock
jest.mock('./VirtualizedGrid', () => {
  MockVirtualizedGrid = jest.fn((props: { GridRows: JSX.Element[][] }) => (
    <div>
      [VirtualizedGrid]
      <div>{props.GridRows}</div>
    </div>
  ))
  return { VirtualizedGrid: MockVirtualizedGrid }
})

var mockUseElementScrollPositionReturnValue: number
var MockUseElementScrollTopPosition: jest.Mock
jest.mock('#/hooks/useElementScrollTopPosition', () => {
  mockUseElementScrollPositionReturnValue = 20
  MockUseElementScrollTopPosition = jest.fn(
    () => mockUseElementScrollPositionReturnValue,
  )
  return { useElementScrollTopPosition: MockUseElementScrollTopPosition }
})

var MockUseVisibleRows: jest.Mock
jest.mock('./hooks/useVisibleRows', () => {
  MockUseVisibleRows = jest.fn(() => [
    { id: '0', data: ['0', 'Product 0', 'Description 0', '0'] },
    { id: '1', data: ['1', 'Product 1', 'Description 1', '1'] },
  ])
  return { useVisibleRows: MockUseVisibleRows }
})

var MockScrollToTop: jest.Mock
jest.mock('#/utils', () => {
  MockScrollToTop = jest.fn()
  return { scrollToTop: MockScrollToTop }
})

var MockUseContainerStyles: jest.Mock
const mockReturnedScrollContainerStyle = {}
const mockReturnedExpandedScrollContainerStyle = {}
jest.mock('./hooks/useContainerStyles', () => {
  MockUseContainerStyles = jest.fn(() => ({
    scrollContainerStyle: mockReturnedScrollContainerStyle,
    expandedScrollContainerStyle: mockReturnedExpandedScrollContainerStyle,
  }))
  return { useContainerStyles: MockUseContainerStyles }
})

var mockCalculateGridItemPropsReturnValue: {
  gridItemStyle: React.CSSProperties
  isFirstRowItem: boolean
  isFirstColumnItem: boolean
}
var MockCalculateGridItemProps: jest.Mock
jest.mock('./helpers', () => {
  mockCalculateGridItemPropsReturnValue = {
    gridItemStyle: {},
    isFirstRowItem: true,
    isFirstColumnItem: true,
  }
  MockCalculateGridItemProps = jest.fn(
    () => mockCalculateGridItemPropsReturnValue,
  )
  return { calculateGridItemProps: MockCalculateGridItemProps }
})

const mockScrollContainerRef = { current: document.createElement('div') }
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: () => mockScrollContainerRef,
}))

describe('useContainerStyles', () => {
  const mockGridWidth = 100
  const mockGridHeight = 200
  const mockCellWidth = 10
  const mockCellHeight = 20
  const mockBufferRowCount = 4

  const mockProductRows: (amount: number) => ProductRow[] = (amount) =>
    Array.from({ length: amount }, (_, i) => ({
      id: i.toString(),
      data: [i.toString(), `Product ${i}`, `Description ${i}`, `${i}`],
    }))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    render(
      <VirtualizedGridContainer
        dataRows={mockProductRows(10)}
        gridHeight={mockGridHeight}
        gridWidth={mockGridWidth}
        cellWidth={mockCellWidth}
        cellHeight={mockCellHeight}
      />,
    )

    expect(screen.getByText('[VirtualizedGrid]')).toBeInTheDocument()
    expect(screen.getAllByText('[GridItem]')).toHaveLength(8)
  })

  it(`should pass the scrollContainerRef to useElementScrollTopPosition 
    and to the VirtualizedGrid to initialize onScroll handling. And to
    the scrollToTop function`, () => {
    render(
      <VirtualizedGridContainer
        dataRows={mockProductRows(10)}
        gridHeight={mockGridHeight}
        gridWidth={mockGridWidth}
        cellWidth={mockCellWidth}
        cellHeight={mockCellHeight}
      />,
    )

    expect(MockUseElementScrollTopPosition).toHaveBeenCalledWith(
      mockScrollContainerRef,
    )
    expect(MockVirtualizedGrid).toHaveBeenCalledWith(
      expect.objectContaining({ scrollContainerRef: mockScrollContainerRef }),
      {},
    )

    const handleScrollToTop =
      MockVirtualizedGrid.mock.calls[0][0].handleScrollToTop
    handleScrollToTop()
    expect(MockScrollToTop).toHaveBeenCalledWith(mockScrollContainerRef)
  })

  it(`should pass the correct scrollPosition and forward props to all hooks, 
    functions and components`, () => {
    const mockDataRows = mockProductRows(10)

    render(
      <VirtualizedGridContainer
        dataRows={mockDataRows}
        gridHeight={mockGridHeight}
        gridWidth={mockGridWidth}
        cellWidth={mockCellWidth}
        cellHeight={mockCellHeight}
        bufferRowCount={mockBufferRowCount}
      />,
    )

    /* it should call useVisibleRows to calculate which out of the whole dataset 
    will be rendered based on scroll position */
    expect(MockUseVisibleRows).toHaveBeenCalledWith({
      dataRows: mockDataRows,
      scrollPosition: mockUseElementScrollPositionReturnValue,
      cellHeight: mockCellHeight,
      gridHeight: mockGridHeight,
      bufferRowCount: mockBufferRowCount,
    })

    /* it should call useContainerStyles to calculate styles such as width 
    and height for the grid containers and define the correct scroll area  */
    expect(MockUseContainerStyles).toHaveBeenCalledWith({
      gridWidth: mockGridWidth,
      gridHeight: mockGridHeight,
      dataRows: mockDataRows,
      cellWidth: mockCellWidth,
      cellHeight: mockCellHeight,
    })

    /* expect calculateGridItemProps to have been called times for each 
    grid item with the correct props, to calculate the gridItem position */
    expect(MockCalculateGridItemProps).toHaveBeenCalledTimes(8)
    // expect first props to be the first row and first column
    expect(MockCalculateGridItemProps).toHaveBeenCalledWith({
      rowIndex: 0,
      columnIndex: 0,
      scrollPosition: mockUseElementScrollPositionReturnValue,
      cellHeight: mockCellHeight,
      cellWidth: mockCellWidth,
      bufferRowCount: mockBufferRowCount,
    })
    // expect last props to be the last row and last column
    expect(MockCalculateGridItemProps).toHaveBeenCalledWith({
      rowIndex: 1,
      columnIndex: 3,
      scrollPosition: mockUseElementScrollPositionReturnValue,
      cellHeight: mockCellHeight,
      cellWidth: mockCellWidth,
      bufferRowCount: mockBufferRowCount,
    })

    expect(MockGridItem).toHaveBeenCalledTimes(8)
    // expect GridItem to have been called with the correct props
    const { gridItemStyle, isFirstRowItem, isFirstColumnItem } =
      mockCalculateGridItemPropsReturnValue
    expect(MockGridItem).toHaveBeenCalledWith(
      expect.objectContaining({
        isFirstColumnItem,
        isFirstRowItem,
        // text is coming from visibleRows, see next test
        text: expect.any(String),
        style: gridItemStyle,
      }),
      {},
    )

    // GridItem should be called with the correct text prop
    const mockVisibleRows = MockUseVisibleRows.mock.results[0].value
    mockVisibleRows.forEach((row: ProductRow, rowIndex: number) => {
      row.data.forEach((text, columnIndex) => {
        expect(MockGridItem).toHaveBeenCalledWith(
          expect.objectContaining({ text }),
          {},
        )
      })
    })

    // it should call VirtualizedGrid with the correct props
    expect(MockVirtualizedGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        GridRows: expect.any(Array),
        scrollContainerStyle: mockReturnedScrollContainerStyle,
        expandedScrollContainerStyle: mockReturnedExpandedScrollContainerStyle,
      }),
      {},
    )
  })
})
