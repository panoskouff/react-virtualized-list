'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './VirtualizedGrid.module.scss'
import { classNames } from '#/utils'

type Props = {
  dataRows: { id: string; data: string[] }[]
  gridHeight: number
  gridWidth: number
  cellWidth: number
  cellHeight: number
}

export const VirtualizedGrid: React.FC<Props> = ({
  dataRows,
  gridHeight,
  gridWidth,
  cellHeight,
  cellWidth,
}) => {
  const [visibleRows, setVisibleRows] = useState<
    { id: string; data: string[] }[]
  >([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const bufferRowCount = 4
  const amountOfRowsToRender =
    Math.floor(gridHeight / cellHeight) + 2 * bufferRowCount

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
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollTop)
      }
    }

    const container = containerRef.current
    container?.addEventListener('scroll', onScroll)

    return () => {
      container?.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollMaxHeight = dataRows.length * cellHeight
  const scrollMaxWidth = dataRows[0] ? dataRows[0].data.length * cellWidth : 0

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ width: gridWidth, height: gridHeight, overflow: 'auto' }}
    >
      <div
        style={{
          width: scrollMaxWidth,
          height: scrollMaxHeight,
          position: 'relative',
        }}
      >
        {visibleRows.map((row, rowIndex) => {
          return row.data.map((text, columnIndex) => {
            const actualStartIndex = Math.max(
              0,
              Math.floor(scrollPosition / cellHeight) - bufferRowCount,
            )
            const top = (rowIndex + actualStartIndex) * cellHeight
            const left = columnIndex * cellWidth
            const isFirstRowItem = rowIndex === 0 && actualStartIndex === 0
            const isFirstColumnItem = columnIndex === 0

            return (
              <div
                key={`${row.id}-${columnIndex}`}
                className={classNames(
                  styles.gridItem,
                  isFirstRowItem ? styles.firstRowItem : undefined,
                  isFirstColumnItem ? styles.firstColumnItem : undefined,
                )}
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  position: 'absolute',
                  top: top,
                  left: left,
                }}
              >
                <div className={styles.textContainer}>{text}</div>
              </div>
            )
          })
        })}
      </div>
    </div>
  )
}
