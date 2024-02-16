import styles from "./home.module.scss";
import { PageWrapper } from "../components/PageWrapper/PageWrapper";
import { FixedGridTitleRow } from "../components/FixedGridTitleRow/FixedGridTitleRow";
import { FixedGridRow } from "../components/FixedGridRow/FixedGridRow";

export default function HomePage() {
  return (
    <PageWrapper>
      <div className={styles.gridContainer}>
        <FixedGridTitleRow
          name="Name"
          description="Description"
          price="Price"
        />
        <FixedGridRow
          name="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, incidunt! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, atque!"
          description="Description 1"
          price="100"
        />
      </div>
    </PageWrapper>
  );
}
