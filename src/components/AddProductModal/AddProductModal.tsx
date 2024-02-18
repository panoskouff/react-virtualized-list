import { useState } from 'react'
import styles from './AddProductModal.module.scss'
import { Button } from '#/components/Button/Button'
import { ProductRow } from '#/types'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  addProduct: (product: ProductRow, addToTheStart: boolean) => void
}

export const AddProductModal: React.FC<Props> = ({
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
    const productToAdd: ProductRow = {
      id: Date.now().toString(),
      data: [
        Date.now().toString(),
        newProduct.name,
        newProduct.description,
        `${parseFloat(newProduct.price).toFixed(2)}€`,
      ],
    }
    addProduct(productToAdd, addToTheStart)
    setIsOpen(false)
  }

  const closeDialog = () => setIsOpen(false)

  return (
    <dialog className={styles.dialog} open={isOpen} onClose={closeDialog}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldSetColumn}>
          <label htmlFor='name'>Name:</label>
          <input
            className={styles.input}
            type='text'
            id='name'
            name='name'
            value={newProduct.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.space} />
        <div className={styles.fieldSetColumn}>
          <label htmlFor='description'>Description:</label>
          <input
            className={styles.input}
            type='text'
            id='description'
            name='description'
            value={newProduct.description}
            onChange={handleChange}
          />
        </div>
        <div className={styles.space} />
        <div className={styles.fieldSetColumn}>
          <label htmlFor='price'>Price (in euro):</label>
          <input
            className={styles.input}
            type='text'
            id='price'
            name='price'
            value={newProduct.price}
            onChange={handleChange}
          />
        </div>
        <div className={styles.space} />
        <div className={styles.fieldSetRow}>
          <label htmlFor='addToTheStart'>Add to the start:</label>
          <input
            type='checkbox'
            id='addToTheStart'
            name='addToTheStart'
            checked={addToTheStart}
            onChange={handleChange}
          />
        </div>
        <div className={styles.space} />
        <Button className={styles.submitButton} type='submit'>
          Add
        </Button>
        <Button onClick={closeDialog}>Cancel</Button>
      </form>
    </dialog>
  )
}
