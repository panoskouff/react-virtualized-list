import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { VirtualizedGrid } from './VirtualizedGrid'

describe('VirtualizedGrid', () => {
  const mockScrollToTop = jest.fn()
  const mockRef = React.createRef<HTMLDivElement>()
  const MockGridRows: React.ReactElement[][] = [
    [
      <div key='row1col1'>Column 1, Row 1</div>,
      <div key='row1col2'>Column 2, Row 1</div>,
      <div key='row1col3'>Column 3, Row 1</div>,
    ],
    [
      <div key='row2col1'>Column 1, Row 2</div>,
      <div key='row2col2'>Column 2, Row 2</div>,
      <div key='row2col3'>Column 3, Row 2</div>,
    ],
  ]
  const mockScrollContainerStyle = { overflow: 'auto' }
  const mockExpandedScrollContainerStyle = { height: '100%' }

  it('should render correctly', () => {
    const { getByText, getAllByText } = render(
      <VirtualizedGrid
        scrollContainerRef={mockRef}
        GridRows={MockGridRows}
        handleScrollToTop={mockScrollToTop}
        scrollContainerStyle={mockScrollContainerStyle}
        expandedScrollContainerStyle={mockExpandedScrollContainerStyle}
      />,
    )
    // check that all rows and columns are rendered
    const columnElements = getAllByText(/Column/i)
    expect(columnElements.length).toBe(6)

    // check that ref is passed to the scroll container div
    expect(mockRef.current).not.toBeNull()
    expect(mockRef.current!.className).toBe('scrollContainer')

    // check that the correct styles are rendered
    expect(mockRef.current!.style).toMatchObject(mockScrollContainerStyle)
    expect(mockRef.current!.firstChild).toHaveStyle('height: 100%')

    expect(getByText('Scroll To Top')).toBeInTheDocument()
  })

  it('should call handleScrollToTop when Scroll To Top button is clicked', () => {
    const { getByText } = render(
      <VirtualizedGrid
        scrollContainerRef={mockRef}
        GridRows={MockGridRows}
        handleScrollToTop={mockScrollToTop}
        scrollContainerStyle={mockScrollContainerStyle}
        expandedScrollContainerStyle={mockExpandedScrollContainerStyle}
      />,
    )

    fireEvent.click(getByText('Scroll To Top'))
    expect(mockScrollToTop).toHaveBeenCalled()
  })
})
