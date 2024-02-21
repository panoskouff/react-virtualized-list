import { fetchFakeProducts } from '#/utils'
import { ProductList } from './ProductList'

export async function FetchAndDisplayProductList() {
  const products = await fetchFakeProducts()
  return <ProductList products={products} />
}
