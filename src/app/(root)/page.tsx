import { ProductList } from '#/views/ProductList/ProductList'
import { faker } from '@faker-js/faker'

type DataItem = {
  id: string
  data: string[]
}

// generate data server side
const data: DataItem[] = Array.from({ length: 100 * 1000 }, (_, index) => ({
  id: faker.string.uuid(),
  data: [
    `Item ${index + 1}`,
    faker.commerce.productName(),
    faker.commerce.productDescription(),
    `${faker.commerce.price()}€`,
  ],
}))

export default function HomePage() {
  return <ProductList data={data} />
}
