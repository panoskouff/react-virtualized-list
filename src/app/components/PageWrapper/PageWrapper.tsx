import styles from './PageWrapper.module.scss'

type Props = {
  children: React.ReactNode
}

export const PageWrapper: React.FC<Props> = ({ children }) => (
  <div className={styles.container}>{children}</div>
)
