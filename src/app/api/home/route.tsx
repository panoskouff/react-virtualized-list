import { NextResponse } from 'next/server'
import { faker } from '@faker-js/faker'

type DataItem = {
  id: string
  data: string[]
}

const data: DataItem[] = Array.from({ length: 100 * 1000 }, (_, index) => ({
  id: faker.datatype.uuid(),
  data: [
    `Item ${index}`,
    faker.commerce.productName(),
    faker.commerce.productDescription(),
    `${faker.commerce.price()}€`,
  ],
}))

export async function GET() {
  return NextResponse.json({ data })
}
