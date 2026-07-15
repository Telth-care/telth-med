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

const applyOptions = [
  { value: 'cm', label: 'Care Manager (CM)' },
  { value: 'ccm', label: 'Collaborative Care Manager (CCM)' },
  { value: 'physician', label: 'Physician' },
]

export default function Header() {
  const [shadow, setShadow] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const prevPath = useRef(location.pathname)
  const dropdownRef = useRef(null)

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  const handleApplySelect = (option) => {
    setIsDropdownOpen(false)
    navigate(`/application-form?role=${option.value}`)
  }

  // Toggle dropdown
  const toggleDropdown = (e) => {
    e.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
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

        {/* Apply Now Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 text-xs font-semibold px-4 py-2 rounded hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-200"
          >
            Apply Now
            <svg 
              className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              {applyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleApplySelect(option)}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}