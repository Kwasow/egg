import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './sites/HomePage'
import Program from './sites/Program'
import ExpertsAndSpeakers from './sites/ExpertsAndSpeakers'
import Photos from './sites/Photos'
import Login from './sites/panel/Login'
import AdminHome from './sites/panel/AdminHome'
import NotFound from './sites/NotFound'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import { EggToolbar } from './utils/MUITheme'
import './App.css'

function App() {
  const currentRoute = window.location.pathname

  return (
    <>
      <NavigationBar route={currentRoute} />
      <div className='flex-wrapper'>
        <div>
          {/* This toolbar is required to add the appropriate padding on top */}
          <EggToolbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/program' element={<Program />} />
            <Route path='/speakers' element={<ExpertsAndSpeakers />} />
            <Route path='/photos' element={<Photos />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<AdminHome />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
