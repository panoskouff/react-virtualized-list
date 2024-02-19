export const scrollToTop = (ref: React.RefObject<HTMLElement>) => {
  if (ref.current) {
    ref.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}
