import { ProductList } from '#/views/ProductList/ProductList'

const data = Array.from({ length: 100 * 1000 }).map((_, index) => ({
  data: [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, incidunt! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, atque!',
    'Some Description',
    index.toString(),
  ],
  id: Date.now().toString() + index,
}))

export default function HomePage() {
  return <ProductList data={data} />
}
