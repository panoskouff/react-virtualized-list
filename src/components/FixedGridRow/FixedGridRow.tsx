import { FixedGridItem } from '../FixedGridItem/FixedGridItem'

type Props = {
  name: string
  description: string
  price: string
}

export const FixedGridRow: React.FC<Props> = ({ name, description, price }) => (
  <>
    <FixedGridItem>{name}</FixedGridItem>
    <FixedGridItem>{description}</FixedGridItem>
    <FixedGridItem>{price}</FixedGridItem>
  </>
)
