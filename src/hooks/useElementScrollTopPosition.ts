import throttle from 'lodash.throttle'
import { useEffect, useState } from 'react'

export const useElementScrollTopPosition = (
  ref: React.RefObject<HTMLDivElement>,
  throttleMs = 50,
) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        setScrollPosition(ref.current.scrollTop)
      }
    }

    const throttledOnScroll = throttle(onScroll, throttleMs)

    const element = ref.current
    element?.addEventListener('scroll', throttledOnScroll)

    return () => element?.removeEventListener('scroll', throttledOnScroll)
  }, [ref, throttleMs])

  return scrollPosition
}
