import React from 'react'
import styles from './AddProductModal.module.scss'
import { Button } from '#/components/Button/Button'

type Props = {
  isOpen: boolean
  newProduct: { name: string; description: string; price: string }
  addToTheStart: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  closeDialog: () => void
}

export const AddProductModal: React.FC<Props> = ({
  isOpen,
  newProduct,
  addToTheStart,
  handleChange,
  handleSubmit,
  closeDialog,
}) => (
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
