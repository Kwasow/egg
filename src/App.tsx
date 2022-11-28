import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './sites/Main'
import Program from './sites/Program'
import SpeakersAndOrganisers from './sites/SpeakersAndOrganisers'
import Sponsors from './sites/Sponsors'
import Photos from './sites/Photos'
import NotFound from './sites/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <NotFound />
  },
  {
    path: '/home',
    element: <Main />,
  },
  {
    path: '/program',
    element: <Program />,
  },
  {
    path: '/speakers',
    element: <SpeakersAndOrganisers />,
  },
  {
    path: '/sponsors',
    element: <Sponsors />,
  },
  {
    path: '/photos',
    element: <Photos />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
