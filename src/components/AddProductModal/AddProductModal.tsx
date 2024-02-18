import { useState } from 'react'
import styles from './AddProductModal.module.scss'
import { Button } from '#/components/Button/Button'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const AddProductModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [newProduct, setNewProduct] = useState<{
    name: string
    description: string
    price: string
  }>({ name: '', description: '', price: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(newProduct)
    setIsOpen(false)
  }

  const closeDialog = () => setIsOpen(false)

  return (
    <dialog className={styles.dialog} open={isOpen} onClose={closeDialog}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldSet}>
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
        <div className={styles.fieldSet}>
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
        <div className={styles.fieldSet}>
          <label htmlFor='price'>Price:</label>
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
        <Button className={styles.submitButton} type='submit'>
          Add
        </Button>
        <Button onClick={closeDialog}>Cancel</Button>
      </form>
    </dialog>
  )
}
