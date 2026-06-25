// Header.jsx
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from "../assets/MEDPASS LOGO - Horizontal.png"

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

  // Handle logo click - navigate to home and scroll to top
  const handleLogoClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      // If already on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Navigate to home and scroll to top
      navigate('/')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <header
      className="bg-white sticky top-0 z-50 border-b border-gray-200"
      style={{ boxShadow: shadow ? '0 6px 18px rgba(0, 0, 0, 0.08)' : 'none' }}
    >
      <div className="max-w-site mx-auto px-6 flex items-center justify-between py-3.5 gap-5">
        {/* Brand - Logo click navigates to top */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img 
            src={logo}
            alt="MedPass Logo"
            className="w-27 h-10 object-contain"
          />
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-700">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => goToAnchor(e, l.href)}
              className="hover:text-yellow-600 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          to="/application-form"
          className="border border-gray-300 text-gray-700 text-xs font-semibold px-4 py-2 rounded hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-200"
        >
          Apply Now
        </Link>
      </div>
    </header>
  )
}