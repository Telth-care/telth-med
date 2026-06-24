import { useState } from 'react'

// Sections
import Hero                from '../sections/Hero.jsx'
import EcosystemBanner     from '../sections/EcosystemBanner.jsx'
import WhoWeAre            from '../sections/WhoWeAre.jsx'
import ProfessionalRoutes  from '../sections/ProfessionalRoutes.jsx'
import Programmes          from '../sections/Programmes.jsx'
import ProgrammeArchitecture from '../sections/ProgrammeArchitecture.jsx'
import CareerPathway       from '../sections/CareerPathway.jsx'
import NextDecade          from '../sections/NextDecade.jsx'
import Pathways            from '../sections/Pathways.jsx'
import ProgrammeComponents from '../sections/ProgrammeComponents.jsx'
import MobilityModel       from '../sections/MobilityModel.jsx'
import Universities        from '../sections/Universities.jsx'
import Employers           from '../sections/Employers.jsx'
import FAQ                 from '../sections/FAQ.jsx'
import Apply               from '../sections/Apply.jsx'
import ComplianceLedger    from '../sections/ComplianceLedger.jsx'

export default function Home() {
  // activeTab is lifted here so University/Employer CTA buttons can trigger tab switch
  const [activeTab, setActiveTab] = useState('candidate')

  // Expose tab switcher globally for non-React anchor onClick handlers
  window.activateTab = (tab) => {
    setActiveTab(tab)
    setTimeout(() => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <main id="top">
      <Hero />
      <EcosystemBanner />
      <WhoWeAre />
      <ProfessionalRoutes />
      <Programmes />
      <ProgrammeArchitecture />
      <CareerPathway />
      <NextDecade />
      <Pathways />
      <ProgrammeComponents />
      <MobilityModel />
      <Universities />
      <Employers />
      <FAQ />
      <Apply activeTab={activeTab} setActiveTab={setActiveTab} />
      <ComplianceLedger />
    </main>
  )
}
