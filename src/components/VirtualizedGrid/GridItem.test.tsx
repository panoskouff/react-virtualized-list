import React from 'react'
import { render, screen } from '@testing-library/react'
import { GridItem } from './GridItem'

var mockClassNames: jest.Mock
jest.mock('#/utils/classNames', () => {
  mockClassNames = jest.fn(() => 'mock-class-name')
  return { classNames: mockClassNames }
})

describe('GridItem', () => {
  const mockProps = {
    text: 'mock-text',
    style: undefined,
    isFirstRowItem: false,
    isFirstColumnItem: false,
  }

  it('should render correctly', () => {
    render(<GridItem {...mockProps} />)
    expect(screen.getByText('mock-text')).toBeInTheDocument()
  })

  it('should apply the correct classNames and styles', () => {
    const { container } = render(<GridItem {...mockProps} />)

    expect(mockClassNames).toHaveBeenCalledWith(
      'gridItem',
      undefined,
      undefined,
    )
    const element = container.querySelector('.mock-class-name')
    expect(element).toBeInTheDocument()
    expect(element!.hasAttribute('style')).toBe(false)

    const gridStyle = { margin: 'auto' }
    const { container: container2 } = render(
      <GridItem
        text='mock-text'
        style={gridStyle}
        isFirstRowItem={true}
        isFirstColumnItem={true}
      />,
    )

    expect(mockClassNames).toHaveBeenCalledWith(
      'gridItem',
      'firstRowItem',
      'firstColumnItem',
    )
    const element2 = container2.querySelector('.mock-class-name')
    expect(element2).toHaveStyle('margin: auto')
  })
})
