import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import './Photos.css'

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
  return <>
    <p>{props.name}</p>
    <p>{props.photos.toString()}</p>
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