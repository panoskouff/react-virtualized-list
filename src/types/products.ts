export type ProductRowDetails = [
  rowId: string,
  name: string,
  description: string,
  price: string,
]

export type ProductRow = { id: string; data: ProductRowDetails }
