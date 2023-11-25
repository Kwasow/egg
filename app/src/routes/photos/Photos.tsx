import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import './Photos.css'
import 'react-photo-view/dist/react-photo-view.css'

type PhotoGroup = {
  name: string
  photos: Array<string>
}

type ResponseJSON = {
  folders: Array<PhotoGroup>
}

async function loadPhotos(): Promise<PhotoGroup[]> {
  const phpUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? process.env.PUBLIC_URL + 'php/getPhotos.json'
      : process.env.PUBLIC_URL + 'php/getPhotos.php'

  return new Promise((resolve, reject) => {
    fetch(phpUrl, { cache: 'no-store' })
      .then((res) => res.json())
      .then((res: ResponseJSON) => {
        res.folders.sort((a, b) => (a.name < b.name ? -1 : 1))
        resolve(res.folders)
      })
      .catch((reason) => reject(reason))
  })
}

function PhotosSection(props: { name: string; photos: Array<string> }) {
  const directory =
    process.env.PUBLIC_URL + 'static/gallery/' + props.name + '/'
  const { t } = useTranslation()

  return (
    <>
      <p className='photos-section-title'>{props.name}</p>
      <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        <PhotoProvider>
          <div className='photos-image-container'>
            {props.photos.map((item, index) => (
              <PhotoView key={index} src={directory + item}>
                <img
                  className='photos-image'
                  src={directory + item}
                  alt={t('gallery.PhotoAlt') + ' (' + props.name + ')'}
                />
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      </div>
    </>
  )
}

function Photos() {
  const [photoGroups, setPhotoGroups] = useState(new Array<PhotoGroup>())
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    loadPhotos()
      .then((res) => {
        setPhotoGroups(res)
        setLoaded(1)
      })
      .catch((reason) => {
        console.log(reason)
        setLoaded(2)
      })
  }, [])

  if (loaded === 1) {
    return (
      <>
        {photoGroups.map((photoGroup, index) => (
          <PhotosSection
            key={index}
            name={photoGroup.name}
            photos={photoGroup.photos}
          />
        ))}
      </>
    )
  } else if (loaded == 2) {
    return <p>Loading failed</p>
  } else {
    return (
      <div className='photos-loading-container'>
        <CircularProgress />
      </div>
    )
  }
}

export default Photos