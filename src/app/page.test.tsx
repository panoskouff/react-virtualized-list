import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from './page'

type AsyncReactComponent = {
  type: {
    name: string
  }
}

// we can't use let or const here due to the way jest.mock scope works
var mockSuspense: jest.Mock
jest.mock('react', () => {
  mockSuspense = jest.fn()
  mockSuspense
    /* Mock Suspense once so if its rendered we can actually see that is there. */
    .mockImplementationOnce(({ fallback }) => <div>[Suspense]</div>)
    /* Suspense contains an Async component that is not supported by jest.
      There is no way to resolve this promise or mock the async function to not
      be async. But we can extract the function name to make sure that the correct
      component is rendered.*/
    .mockImplementation(({ children }) => (
      <div>{`[${(children as AsyncReactComponent).type.name}]`}</div>
    ))
  const originalReact = jest.requireActual('react')

  return {
    __esModule: true,
    ...originalReact,
    Suspense: mockSuspense,
  }
})

describe('HomePage', () => {
  it('Should show loading state as a fallback until HomePage loads', async () => {
    // we need to await because jest does not support async rendering
    // https://github.com/testing-library/react-testing-library/issues/1209
    render(await HomePage())
    expect(screen.getByText('[Suspense]')).toBeInTheDocument()

    const props = mockSuspense.mock.calls[0][0]
    expect(props.fallback).toEqual(
      <div className='loading'>Loading product data...</div>,
    )
  })

  it('Should render FetchAndDisplayProductList component once loaded', async () => {
    render(await HomePage())
    expect(screen.getByText('[FetchAndDisplayProductList]')).toBeInTheDocument()
  })
})
