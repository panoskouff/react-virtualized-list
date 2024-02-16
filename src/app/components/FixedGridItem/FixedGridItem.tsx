import styles from "./FixedGridItem.module.scss";

type Props = {
  children: React.ReactNode;
  isHeader?: boolean;
};

export const FixedGridItem: React.FC<Props> = ({ children, isHeader }) => (
  <div className={styles.gridItem}>
    <div
      className={`${styles.textContainer} ${isHeader ? styles.header : ""}`.trim()}
    >
      {children}
    </div>
  </div>
);
