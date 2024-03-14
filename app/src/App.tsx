import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './routes/home/HomePage'
import Program from './routes/program/Program'
import ExpertsAndSpeakers from './routes/experts/ExpertsAndSpeakers'
import Photos from './routes/photos/Photos'
import Login from './routes/admin/Login'
import AdminHome from './routes/admin/AdminHome'
import NotFound from './routes/NotFound'
import Sunshine from './routes/sunshine/Sunshine'
import NavigationBar from './components/navigation/NavigationBar'
import Footer from './components/Footer'
import { EggToolbar } from './utils/MUITheme'
import './App.css'
import { useAppDispatch } from './utils/redux/hooks'
import { setRoute } from './components/navigation/redux/slice'
import SpeakersEditor from './routes/admin/editors/SpeakersEditor'
import ResourceEditor from './routes/admin/editors/ResourceEditor'
import ExpertsEditor from './routes/admin/editors/ExpertsEditor'

function App() {
  const dispatch = useAppDispatch()
  dispatch(setRoute(window.location.pathname))

  return (
    <>
      <NavigationBar />
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
            <Route path='/sunshine' element={<Sunshine />} />
            <Route path='/admin' element={<AdminHome />} />
            <Route path='/admin/speakers' element={<SpeakersEditor />} />
            <Route path='/admin/resources' element={<ResourceEditor />} />
            <Route path='/admin/experts' element={<ExpertsEditor />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
