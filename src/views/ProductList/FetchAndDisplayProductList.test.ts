import { FetchAndDisplayProductList } from './FetchAndDisplayProductList'

var mockFetchFakeProducts: jest.Mock
jest.mock('#/utils/fetchFakeProducts', () => {
  mockFetchFakeProducts = jest.fn(() => 'mocked fetchFakeProducts')

  return {
    __esModule: true,
    fetchFakeProducts: mockFetchFakeProducts,
  }
})

describe('fetchFakeProducts', () => {
  it('Should fetch the fake products and pass them to ProductList component', async () => {
    expect(mockFetchFakeProducts).not.toHaveBeenCalled()
    const ProductListComponent = await FetchAndDisplayProductList()
    expect(mockFetchFakeProducts).toHaveBeenCalled()
    expect(ProductListComponent.props).toEqual({
      products: 'mocked fetchFakeProducts',
    })
  })
})
