import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from './page'

type AsyncReactComponent = {
  type: {
    name: string
  }
}

jest.mock('react', () => {
  const mockSuspense = jest.fn()
  mockSuspense
    /* If suspense is rendered mock it once to <div>[Suspense]</div> so we can test if 
      its there. */
    .mockImplementationOnce(() => <div>[Suspense]</div>)
    /* Suspense contains an Async component that is not supported by jest.
      There is no way to resolve this promise or mock the async function to not
      be async. But we can extract the function name to make sure that the correct
      component is rendered.*/
    .mockImplementation(({ children }) => (
      <div>{`[${(children as AsyncReactComponent).type.name}]`}</div>
    ))
  const originalReact = jest.requireActual('react')

  return {
    ...originalReact,
    Suspense: mockSuspense,
  }
})

describe('HomePage', () => {
  it('Should wrap the HomePage content in Suspense', async () => {
    // we need to await because jest does not support async rendering
    // https://github.com/testing-library/react-testing-library/issues/1209
    render(await HomePage())
    expect(screen.getByText('[Suspense]')).toBeInTheDocument()
  })

  it('Should render FetchAndDisplayProductList component as a child of Suspense', async () => {
    render(await HomePage())
    expect(screen.getByText('[FetchAndDisplayProductList]')).toBeInTheDocument()
  })
})
