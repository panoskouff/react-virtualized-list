'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  CSSProperties,
} from 'react'
import { ProductRow } from '#/types'
import throttle from 'lodash.throttle'
import { GridItem } from './GridItem'
import { VirtualizedGrid } from './VirtualizedGrid'

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
  /* since our component rerenders whenever scrollPosition changes 
    and always produces new visibleRows, memoizing anything related 
    to these values wont have any impact  */
  const [visibleRows, setVisibleRows] = useState<ProductRow[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const bufferRowCount = 4
  const amountOfRowsToRender = React.useMemo(
    () => Math.floor(gridHeight / cellHeight) + 2 * bufferRowCount,
    [gridHeight, cellHeight],
  )

  useEffect(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollPosition / cellHeight) - bufferRowCount,
    )

    const endIndex = Math.min(
      dataRows.length,
      startIndex + amountOfRowsToRender,
    )

    setVisibleRows(dataRows.slice(startIndex, endIndex))
  }, [scrollPosition, dataRows, amountOfRowsToRender, cellHeight])

  useEffect(() => {
    const onScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop
        requestAnimationFrame(() => {
          setScrollPosition(scrollTop)
        })
      }
    }

    /* normal invocation of onScroll is once every 16.67ms 
    since browser's goal is 60fps (1000 ms / 60 = 16.67 ms) */
    const throttledOnScroll = throttle(onScroll, 50)

    const container = scrollContainerRef.current
    container?.addEventListener('scroll', throttledOnScroll)

    return () => {
      container?.removeEventListener('scroll', throttledOnScroll)
    }
  }, [])

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const scrollContainerStyle: CSSProperties = useMemo(
    () => ({
      width: gridWidth,
      height: gridHeight,
      overflow: 'auto',
    }),
    [gridWidth, gridHeight],
  )

  const expandScrollContainer: CSSProperties = useMemo(() => {
    return {
      width: dataRows[0] ? dataRows[0].data.length * cellWidth : 0,
      height: dataRows.length * cellHeight,
      position: 'relative',
    }
  }, [dataRows, cellHeight, cellWidth])

  const gridRows = visibleRows.map((row, rowIndex) => {
    return row.data.map((text, columnIndex) => {
      const actualStartIndex = Math.max(
        0,
        Math.floor(scrollPosition / cellHeight) - bufferRowCount,
      )
      const top = (rowIndex + actualStartIndex) * cellHeight
      const left = columnIndex * cellWidth
      const isFirstRowItem = rowIndex === 0 && actualStartIndex === 0
      const isFirstColumnItem = columnIndex === 0

      const gridItemStyle: CSSProperties = {
        width: cellWidth,
        height: cellHeight,
        position: 'absolute',
        top,
        left,
      }

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
      expandScrollContainer={expandScrollContainer}
    />
  )
}
