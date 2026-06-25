// App.jsx
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'

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
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <RegStrip /> */}
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/application-form" element={<ApplicationForm />} />
      </Routes>
    </>
  )
}