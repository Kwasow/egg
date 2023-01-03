import React from 'react'

import './Program.css'

function Program() {
  const programImageURL = process.env.PUBLIC_URL + '/static/images/program.png'

  return <>
    <div className='gray-divider'>
      <div className='left-container'>
        <div>
          <p className='text-primary text-primary-top'>Termin</p>
          <p className='text-secondary'>14-16 kwietnia</p>
          <p className='text-primary'>Adres</p>
          <p className='text-secondary'>
            Collegium Anatomicum<br/>ul. Tytusa Chałubińskiego 5, Warszawa</p>
        </div>
      </div>
      <img style={{ height: '400px' }} src={programImageURL}/>
    </div>
  </>
}

export default Program
