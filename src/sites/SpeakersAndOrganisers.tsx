import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SpeakersTab, SpeakersTabs } from '../utils/MUITheme'

interface TabPanelProps {
  index: number;
  value: number;
}

interface Description {
  list: string[];
}

interface PersonJSON {
  position: number;
  name: string;
  description: string;
  picture: string;
}

async function getPeopleSorted(directory: string): Promise<PersonJSON[]> {  
  return new Promise((resolve, reject) => {
    fetch(directory + '/description.json')
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((json) => {
        console.log('jejeje')
        console.log(json)
        return JSON.parse(json)
      })
      .then((description: Description) => {
        const urls = description.list.map((value) => directory + '/' + value)
        const requests = urls.map((url) => {
          return fetch(url)
            .then((res) => res.json())
            .then((json) => JSON.parse(json))
        })

        Promise.all(requests)
          .then((results: PersonJSON[]) => {
            results.sort((a, b) => a.position - b.position)
            resolve(results)
          })
          .catch((reason) => {
            console.log('here1')
            reject(reason)
          })
      })
      .catch((reason) => {
        console.log('here2')
        reject(reason)
      })
  })
}

function Speakers(props: TabPanelProps) {
  const dataPath = 'static/speakers'
  const [people, setPeople] = useState(new Array<PersonJSON>)
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)
  
  getPeopleSorted(dataPath)
    .then((res) => {
      console.log('loaded')
      setPeople(res)
      setLoaded(1)
    })
    .catch((reason) => {
      console.log(reason)
      setLoaded(2)
    })

  if (props.index == props.value) {
    if (loaded === 1) {
      return <p>{people.toString()}</p>
    } else if (loaded == 2) {
      return <p>Loading failed</p>
    } else {
      return <p>Loading...</p>
    }
  } else {
    return <></>
  }
}

function Organisers(props: TabPanelProps) {
  const dataPath = 'static/organisers'
  const [people, setPeople] = useState(new Array<PersonJSON>)
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)
  
  getPeopleSorted(dataPath)
    .then((res) => {
      console.log('loaded')
      setPeople(res)
      setLoaded(1)
    })
    .catch((reason) => {
      console.log(reason)
      setLoaded(2)
    })

  if (props.index == props.value) {
    if (loaded === 1) {
      return <p>{people.toString()}</p>
    } else if (loaded == 2) {
      return <p>Loading failed</p>
    } else {
      return <p>Loading...</p>
    }
  } else {
    return <></>
  }
}

function a11yProps(index: number) {
  return {
    id: `speakers-and-organisers-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function SpeakersAndOrganisers() {
  const {t} = useTranslation()
  const [tab, setTab] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return <>
    <div style={{
      height: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        Temporary empty space
    </div>
    <SpeakersTabs value={tab} onChange={handleChange} variant='fullWidth'>
      <SpeakersTab label={t('speakersAndOrganisers.speakers')} {...a11yProps(0)} />
      <SpeakersTab label={t('speakersAndOrganisers.organisers')} {...a11yProps(1)} />
    </SpeakersTabs>
    <Speakers value={tab} index={0} />
    <Organisers value={tab} index={1} />
  </>
}

export default SpeakersAndOrganisers
