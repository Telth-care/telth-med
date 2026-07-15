// ApplicationHero.jsx
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../../assets/Image-logo.png';

export default function ApplicationHero() {
  const navigate = useNavigate();
   const [searchParams] = useSearchParams();
  const roleFromURL = searchParams.get("role");

  const goBack = () => {
    navigate('/')
  }

  return (
    <section className="bg-[#0B355E] text-white">
      <div className="max-w-[1184px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
          <button
            onClick={goBack}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </button>
          <span className="text-white/40">/</span>
          <span className="text-white">Application Form</span>
        </nav>

        <div className="flex items-center gap-3 mb-7 flex-wrap">
           <img
              src={logo}
              alt="Harley Health Logo"
              className="w-27 h-14 object-contain"
            />
          {/* <div className="w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white flex items-center justify-center flex-shrink-0">
           
          </div> */}
          {/* <div>
            <p className="font-bold text-lg leading-tight">Harley Health System</p>
            <p className="text-white/70 text-xs font-medium tracking-wide">Healthcare Education Division</p>
          </div> */}
          <span className="ml-0 sm:ml-auto inline-flex items-center gap-2 bg-white text-black/90 text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-[#C6A50B]">
            <span className="w-2 h-2 rounded-full bg-[#F4B400]" /> Applications Open
          </span>
        </div>

        <h1 className="text-2xl sm:text-[30px] font-bold leading-tight max-w-2xl">
          Application for {roleFromURL === "cm" ? "Care Manager" : roleFromURL === "ccm" ? "Collaborative Care Manager" : "Physician"} Admission
        </h1>
        <p className="text-white/70 text-sm mt-3">
          Global Employment Mobility &amp; Healthcare Workforce Development Program
        </p>
      </div>
    </section>
  )
}