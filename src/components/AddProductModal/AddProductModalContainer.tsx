import { useState } from 'react'
import { AddProductModal } from './AddProductModal'
import { ProductRow } from '#/types'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  addProduct: (product: ProductRow, addToTheStart: boolean) => void
}

export const AddProductModalContainer: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  addProduct,
}) => {
  const [newProduct, setNewProduct] = useState<{
    name: string
    description: string
    price: string
  }>({ name: '', description: '', price: '' })
  const [addToTheStart, setAddToTheStart] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'name' || name === 'description') {
      setNewProduct({ ...newProduct, [name]: value })
    } else if (name === 'price') {
      if (/^\d*\.?\d*$/.test(value) || value === '') {
        setNewProduct({ ...newProduct, price: value })
      }
    } else if (name === 'addToTheStart') {
      setAddToTheStart(e.target.checked)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Date.now().toString()
    const productToAdd: ProductRow = {
      id,
      data: [
        id,
        newProduct.name,
        newProduct.description,
        `${parseFloat(newProduct.price).toFixed(2)}€`,
      ],
    }
    addProduct(productToAdd, addToTheStart)
    setIsOpen(false)
  }

  return (
    <AddProductModal
      isOpen={isOpen}
      newProduct={newProduct}
      addToTheStart={addToTheStart}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      closeDialog={() => setIsOpen(false)}
    />
  )
}
