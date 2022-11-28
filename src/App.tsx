import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './sites/Main'
import Program from './sites/Program'
import SpeakersAndOrganisers from './sites/SpeakersAndOrganisers'
import Sponsors from './sites/Sponsors'
import Photos from './sites/Photos'
import NotFound from './sites/NotFound'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import { EggToolbar } from './utils/MUITheme'
import './App.css'

function App() {
  let currentRoute = window.location.pathname
  if (currentRoute === '/') {
    currentRoute = '/home'
  }

  return <>
    <NavigationBar route={currentRoute} />
    <div className='flex-wrapper'>
      <div>
        {/* The toolbar is required to add the appropriate padding on top */}
        <EggToolbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/home' element={<Main />} />
          <Route path='/program' element={<Program />} />
          <Route path='/speakers' element={<SpeakersAndOrganisers />} />
          <Route path='/sponsors' element={<Sponsors />} />
          <Route path='/photos' element={<Photos />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </>
}

export default App
