import { NextResponse } from 'next/server'
import { faker } from '@faker-js/faker'

type DataItem = {
  [id: string]: [name: string, description: string, price: string]
}

const data: DataItem[] = Array.from({ length: 100 * 1000 }, () => ({
  [faker.string.uuid()]: [
    faker.commerce.productName(),
    faker.commerce.productDescription(),
    `${faker.commerce.price()}€`,
  ],
}))

export async function GET() {
  return NextResponse.json({ data })
}
