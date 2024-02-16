import { NextResponse, type NextRequest } from 'next/server'

const PermanentRedirect = 301

const DEV_MODE = process.env.NODE_ENV === 'development'

export function middleware(request: NextRequest) {
  const newUrl = (path: string) => new URL(path, request.url)

  if (!DEV_MODE && request.nextUrl.pathname.startsWith('/contact')) {
    // contact page is still WIP
    return NextResponse.redirect(newUrl('/'), 307)
  }

  if (!DEV_MODE && request.nextUrl.pathname.startsWith('/testpage')) {
    // testpage is available only during development
    return NextResponse.redirect(newUrl('/'), 307)
  }

  // Redirect old website urls to new ones

  if (request.nextUrl.pathname.startsWith('/cv.html')) {
    // return NextResponse.rewrite(new URL('/cv', request.url))
    return NextResponse.redirect(newUrl('/cv'), PermanentRedirect)
  }

  // @todo the rest
}
