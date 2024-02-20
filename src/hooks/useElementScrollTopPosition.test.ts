import { renderHook, act } from '@testing-library/react'
import { useElementScrollTopPosition } from './useElementScrollTopPosition'

describe('useElementScrollTopPosition', () => {
  it('should update scroll position when onScroll is called', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useElementScrollTopPosition(ref))

    act(() => {
      ref.current.scrollTop = 100
      const scrollEvent = new Event('scroll')
      ref.current.dispatchEvent(scrollEvent)
    })

    expect(result.current).toBe(100)
  })

  it('should do proper cleanup', () => {
    const ref = { current: document.createElement('div') }
    const removeEventListenerSpy = jest.spyOn(
      ref.current,
      'removeEventListener',
    )

    const { unmount } = renderHook(() => useElementScrollTopPosition(ref))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    )
  })
})
