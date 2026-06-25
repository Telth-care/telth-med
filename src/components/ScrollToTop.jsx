// components/ScrollToTop.jsx
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const location = useLocation()
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      prevPath.current = location.pathname
    }
  }, [location.pathname])

  return null
}