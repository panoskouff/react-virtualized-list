import { FixedGridItem } from '../FixedGridItem/FixedGridItem'

type Props = {
  name: string
  description: string
  price: string
}

export const FixedGridTitleRow: React.FC<Props> = ({
  name,
  description,
  price,
}) => (
  <>
    <FixedGridItem isHeader>{name}</FixedGridItem>
    <FixedGridItem isHeader>{description}</FixedGridItem>
    <FixedGridItem isHeader>{price}</FixedGridItem>
  </>
)
