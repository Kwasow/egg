import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { CircularProgress } from '@mui/material'
import './Photos.css'

type PhotoGroup = {
  name: string;
  photos: Array<string>;
}

async function loadPhotos(): Promise<PhotoGroup[]> {
  const photosPath = 'static/images/gallery'
}

function PhotosSection(props: {
  name: string,
  photos: Array<string>
}) {
  return <></>
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