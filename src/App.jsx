import { Routes, Route } from 'react-router-dom'

// Components
import RegStrip   from './components/RegStrip.jsx'
import Header     from './components/Header.jsx'
import Footer     from './components/Footer.jsx'

// Pages
import Home from './pages/Home.jsx'
import ApplicationForm from './pages/ApplicationForm/ApplicationForm.jsx'

export default function App() {
  return (
    <>
      <RegStrip />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application-form" element={<ApplicationForm />} />
      </Routes>
      <Footer />
    </>
  )
}
