import styles from "./home.module.scss";
import { PageWrapper } from "../components/PageWrapper/PageWrapper";

export default function HomePage() {
  return (
    <PageWrapper>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>Name</div>
        <div className={styles.gridItem}>Description</div>
        <div className={styles.gridItem}>Price</div>
        <div className={styles.gridItem}>
          <div className={styles.textContainer}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            incidunt! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Accusantium, atque!
          </div>
        </div>
        <div className={styles.gridItem}>
          <div className={styles.textContainer}>Lorem, ipsum.</div>
        </div>
        <div className={styles.gridItem}>
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </div>
      </div>
    </PageWrapper>
  );
}
