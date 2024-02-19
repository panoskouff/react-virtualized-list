import React, { CSSProperties } from 'react'
import styles from './VirtualizedGrid.module.scss'
import { Button } from '../Button/Button'

type Props = {
  scrollContainerRef: React.RefObject<HTMLDivElement>
  GridRows: JSX.Element[][]
  handleScrollToTop: () => void
  scrollContainerStyle: CSSProperties
  expandScrollContainer: CSSProperties
}

export const VirtualizedGrid: React.FC<Props> = ({
  scrollContainerRef,
  GridRows,
  handleScrollToTop,
  scrollContainerStyle,
  expandScrollContainer,
}) => (
  <div className={styles.container}>
    <div ref={scrollContainerRef} style={scrollContainerStyle}>
      <div style={expandScrollContainer}>{GridRows}</div>
    </div>
    <Button onClick={handleScrollToTop}>Scroll To Top</Button>
  </div>
)
