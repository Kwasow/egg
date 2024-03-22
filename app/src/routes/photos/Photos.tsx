import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import './Photos.css'
import 'react-photo-view/dist/react-photo-view.css'
import { phpPrefix } from '../../components/Shared'

type PhotoGroup = {
  name: string
  photos: Array<string>
}

type ResponseJSON = {
  folders: Array<PhotoGroup>
}

async function loadPhotos(): Promise<PhotoGroup[]> {
  const phpUrl = phpPrefix + '/photos/get.php'

  function compare(a: PhotoGroup, b: PhotoGroup): number {
    const split1 = a.name.split('-')
    const split2 = b.name.split('-')

    if (split1.length != 2 || split2.length != 2) {
      return a.name < b.name ? -1 : 1
    }

    if (split1[0] < split2[0]) {
      return 1
    } else if (split1[0] > split2[0]) {
      return -1
    } else {
      return split1[1] < split2[1] ? -1 : 1
    }
  }

  return new Promise((resolve, reject) => {
    fetch(phpUrl, { cache: 'no-store' })
      .then((res) => res.json())
      .then((res: ResponseJSON) => {
        res.folders.sort((a, b) => compare(a, b))
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
                  src={directory + item + '.thumb'}
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
