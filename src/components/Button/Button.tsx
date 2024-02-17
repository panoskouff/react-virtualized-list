import styles from './Button.module.scss'
import { classNames } from '#/utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({
  children,
  className,
  type = 'button',
  ...rest
}) => (
  <button
    className={classNames(styles.button, className)}
    type={type}
    {...rest}
  >
    {children}
  </button>
)
