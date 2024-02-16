'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './VirtualizedGrid.module.scss'
import { classNames } from '#/utils'

type Props = {
  data: string[][]
  gridHeight: number
  gridWidth: number
  cellWidth: number
  cellHeight: number
}

export const VirtualizedGrid: React.FC<Props> = ({
  data,
  gridHeight,
  gridWidth,
  cellHeight,
  cellWidth,
}) => {
  const [visibleData, setVisibleData] = useState<string[][]>([])
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

    const endIndex = Math.min(data.length, startIndex + amountOfRowsToRender)

    setVisibleData(data.slice(startIndex, endIndex))
  }, [scrollPosition, data, amountOfRowsToRender, cellHeight])

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

  const scrollMaxHeight = data.length * cellHeight
  const scrollMaxWidth = data[0].length * cellWidth

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
        {visibleData.map((row, rowIndex) =>
          row.map((text, columnIndex) => {
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
                key={`${rowIndex}-${columnIndex}`}
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
          }),
        )}
      </div>
    </div>
  )
}
