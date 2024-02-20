'use client'

import React, { useRef } from 'react'
import { ProductRow } from '#/types'
import { GridItem } from './GridItem'
import { VirtualizedGrid } from './VirtualizedGrid'
import { calculateGridItemProps } from './helpers'
import { useVisibleRows } from './hooks/useVisibleRows'
import { useElementScrollTopPosition } from '#/hooks/useElementScrollTopPosition'
import { useContainerStyles } from './hooks/useContainerStyles'
import { scrollToTop } from '#/utils'

type Props = {
  dataRows: ProductRow[]
  gridHeight: number
  gridWidth: number
  cellWidth: number
  cellHeight: number
}

export const VirtualizedGridContainer: React.FC<Props> = ({
  dataRows,
  gridHeight,
  gridWidth,
  cellHeight,
  cellWidth,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollPosition = useElementScrollTopPosition(scrollContainerRef)
  const bufferRowCount = 4
  const visibleRows = useVisibleRows({
    dataRows,
    scrollPosition,
    cellHeight,
    gridHeight,
    bufferRowCount,
  })
  const handleScrollToTop = () => scrollToTop(scrollContainerRef)

  const { scrollContainerStyle, expandedScrollContainerStyle } =
    useContainerStyles({
      gridWidth,
      gridHeight,
      dataRows,
      cellWidth,
      cellHeight,
    })

  const gridRows = visibleRows.map((row, rowIndex) => {
    return row.data.map((text, columnIndex) => {
      const { gridItemStyle, isFirstRowItem, isFirstColumnItem } =
        calculateGridItemProps({
          rowIndex,
          columnIndex,
          scrollPosition,
          cellHeight,
          cellWidth,
          bufferRowCount,
        })

      return (
        <GridItem
          key={`${row.id}-${columnIndex}`}
          text={text}
          style={gridItemStyle}
          isFirstRowItem={isFirstRowItem}
          isFirstColumnItem={isFirstColumnItem}
        />
      )
    })
  })

  return (
    <VirtualizedGrid
      scrollContainerRef={scrollContainerRef}
      GridRows={gridRows}
      handleScrollToTop={handleScrollToTop}
      scrollContainerStyle={scrollContainerStyle}
      expandedScrollContainerStyle={expandedScrollContainerStyle}
    />
  )
}
