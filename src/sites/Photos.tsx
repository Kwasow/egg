import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import './Photos.css'
import 'react-photo-view/dist/react-photo-view.css'

type PhotoGroup = {
  name: string;
  photos: Array<string>;
}

type ResponseJSON = {
  folders: Array<PhotoGroup>;
};

async function loadPhotos(): Promise<PhotoGroup[]> {
  const phpUrl = 'php/getPhotos.php'

  return new Promise((resolve, reject) => {
    fetch(phpUrl)
      .then((res) => res.json())
      .then((res: ResponseJSON) => {
        res.folders.sort((a, b) => (a.name < b.name) ? -1 : 1)
        resolve(res.folders)
      })
      .catch((reason) => reject(reason))
  })
}

function PhotosSection(props: {
  name: string,
  photos: Array<string>
}) {
  const directory = 'static/gallery/' + props.name + '/'
  const {t} = useTranslation()

  return <>
    <p className='photos-section-title'>{props.name}</p>
    <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
      <PhotoProvider>
        {props.photos.map((item, index) => (
          <PhotoView key={index} src={directory + item}>
            <img
              style={{
                height: 120,
                width: '16%', objectFit: 'cover', padding: '0.33%' }}
              src={directory + item}
              alt={t('gallery.photoAlt') + ' (' +  props.name +')'} />
          </PhotoView>
        ))}
      </PhotoProvider>
    </div>
  </>
}

function Photos() {
  const [photoGroups, setPhotoGroups] = useState(new Array<PhotoGroup>)
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
    return <>
      {photoGroups.map((photoGroup, index) => (
        <PhotosSection
          key={index}
          name={photoGroup.name}
          photos={photoGroup.photos} />
      ))}
    </>
  } else if (loaded == 2) {
    return <p>Loading failed</p>
  } else {
    return <div className='photos-loading-container'>
      <CircularProgress />
    </div>
  }
}

export default Photos