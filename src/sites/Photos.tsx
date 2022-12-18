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

  // I think we need a server for this
  return new Promise((resolve, reject) => {
    resolve(new Array<PhotoGroup>())
  })
  // return new Promise((resolve, reject) => {
  //   fetch(directory + '/description.json')
  //     .then((res) => res.json())
  //     .then((description: Description) => {
  //       const urls = description.list.map((value) => directory + '/' + value)
  //       const requests = urls.map((url) => {
  //         return fetch(url)
  //           .then((res) => res.json())
  //           .catch((reason) => reject(reason))
  //       })

  //       Promise.all(requests)
  //         .then((results: PersonJSON[]) => {
  //           results.sort((a, b) => a.position - b.position)

  //           for (let i = 0; i < results.length; i++) {
  //             results[i].position = i + 1
  //           }

  //           resolve(results)
  //         })
  //         .catch((reason) => reject(reason))
  //     })
  //     .catch((reason) => reject(reason))
  // })
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