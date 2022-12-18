import React, { useEffect, useState } from 'react'
import { CircularProgress, Dialog, ImageListItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PhotoGrid } from '../utils/MUITheme'
import './Photos.css'

type PhotoGroup = {
  name: string;
  photos: Array<string>;
}

type ResponseJSON = {
  folders: Array<PhotoGroup>;
};

async function loadPhotos(): Promise<PhotoGroup[]> {
  const phpUrl = 'http://192.168.86.29/php/getPhotos.php'

  return new Promise((resolve, reject) => {
    fetch(phpUrl)
      .then((res) => res.json())
      .then((res: ResponseJSON) => {
        res.folders.sort((a, b) => (a.name > b.name) ? -1 : 1)
        resolve(res.folders)
      })
      .catch((reason) => reject(reason))
  })
}

function PhotosSection(props: {
  name: string,
  photos: Array<string>
}) {
  const directory = 'http://192.168.86.29/static/gallery/' + props.name + '/'
  const {t} = useTranslation()

  const [open, setOpen] = useState(false)
  const [image, setImage] = useState('')

  return <>
    <p className='photos-section-title'>{props.name}</p>
    <PhotoGrid
      cols={8}
      gap={10}
      rowHeight={120}>
      {props.photos.map((photo: string, index) => (
        <ImageListItem key={index}>
          <img
            className='photos-photo'
            src={directory + photo}
            // BUG: For some reason this doesn't work when it's not inline
            style={{ height: 120 }}
            loading='lazy'
            alt={t('gallery.photoAlt') + ' (' +  props.name +')'}
            onClick={() => {
              setImage(directory + photo)
              setOpen(true)
            }} />
        </ImageListItem>
      ))}
    </PhotoGrid>
    <Dialog open={open} fullWidth={true}>
      <img
        src={image}
        alt={t('gallery.photoAlt') + ' (' +  props.name +')'}
        onClick={() => setOpen(false)} />
    </Dialog>
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