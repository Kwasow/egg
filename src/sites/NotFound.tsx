import React from 'react'

import './NotFound.css'

function NotFound() {
  return <>
    <div className='container'>
      <img className='ghost-icon' src='static/images/ghost.svg' />
      <p className='error-boo'>Bu!</p>
      <p className='error-text'>Obudziłeś ducha, który mieszka na tej pustej stronie</p>
    </div>
  </>
}

export default NotFound
