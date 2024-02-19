import React, { CSSProperties } from 'react'
import styles from './VirtualizedGrid.module.scss'
import { Button } from '../Button/Button'

type Props = {
  scrollContainerRef: React.RefObject<HTMLDivElement>
  GridRows: JSX.Element[][]
  handleScrollToTop: () => void
  scrollContainerStyle: CSSProperties
  expandedScrollContainerStyle: CSSProperties
}

export const VirtualizedGrid: React.FC<Props> = ({
  scrollContainerRef,
  GridRows,
  handleScrollToTop,
  scrollContainerStyle,
  expandedScrollContainerStyle,
}) => (
  <div className={styles.container}>
    <div
      className={styles.scrollContainer}
      ref={scrollContainerRef}
      style={scrollContainerStyle}
    >
      <div style={expandedScrollContainerStyle}>{GridRows}</div>
    </div>
    <Button className={styles.scrollToTopButton} onClick={handleScrollToTop}>
      Scroll To Top
    </Button>
  </div>
)
