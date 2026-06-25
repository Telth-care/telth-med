// Header.jsx
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { href: '#pathways',     label: 'Pathways' },
  { href: '#programmes',   label: 'Programmes' },
  { href: '#architecture', label: 'Journey' },
  { href: '#model',        label: 'Mobility' },
  { href: '#universities', label: 'Universities' },
  { href: '#employers',    label: 'Employers' },
  { href: '#faq',          label: 'FAQ' },
]

export default function Header() {
  const [shadow, setShadow] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const prevPath = useRef(location.pathname)

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      prevPath.current = location.pathname
    }
  }, [location.pathname])

  // Handle anchor navigation
  const goToAnchor = (e, hash) => {
    e.preventDefault()
    
    // If not on home page, navigate to home first
    if (!isHome) {
      navigate('/')
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 150)
      return
    }

    // If on home page, scroll to the section
    const element = document.querySelector(hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header
      className="bg-ink sticky top-0 z-50 border-b border-white/10"
      style={{ boxShadow: shadow ? '0 6px 18px rgba(0,0,0,0.18)' : 'none' }}
    >
      <div className="max-w-site mx-auto px-6 flex items-center justify-between py-3.5 gap-5">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <span className="w-9 h-9 border border-brass rounded-full flex items-center justify-center font-serif font-semibold text-brass text-sm">
            TU
          </span>
          <span className="font-serif text-parchment font-semibold text-base">
            TELTH-U <em className="text-brass not-italic font-medium">MedPass</em>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium text-parchment/75">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => goToAnchor(e, l.href)}
              className="hover:text-parchment transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          to="/application-form"
          className="border border-parchment/30 text-parchment text-xs font-semibold px-4 py-2 rounded hover:bg-parchment/10 transition-colors"
        >
          Apply Now
        </Link>
      </div>
    </header>
  )
}