import React, { useEffect, useState, SyntheticEvent } from 'react'
import { CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SpeakersTab, SpeakersTabs } from '../utils/MUITheme'
import './SpeakersAndOrganisers.css'

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

async function getPeopleSorted(type: string): Promise<PersonJSON[]> {
  const phpUrl = 'php/getPeople.php?type=' + type
  const directory = 'static/' + type

  return new Promise((resolve, reject) => {
    fetch(phpUrl)
      .then((res) => res.json())
      .then((description: Description) => {
        const urls = description.list.map((value) => directory + '/' + value)
        const requests = urls.map((url) => {
          return fetch(url)
            .then((res) => res.json())
            .catch((reason) => reject(reason))
        })

        Promise.all(requests)
          .then((results: PersonJSON[]) => {
            results.sort((a, b) => a.position - b.position)

            for (let i = 0; i < results.length; i++) {
              results[i].position = i + 1
            }

            resolve(results)
          })
          .catch((reason) => reject(reason))
      })
      .catch((reason) => reject(reason))
  })
}

function PeopleListView(props: {
  people: PersonJSON[],
  type: string
}) {
  const {t} = useTranslation()
  const directory = '/static/' + props.type + '/'

  if (props.people.length === 0) {
    return <p>Empty people list</p>
  } else {
    return <div>
      {props.people.map(person => (
        <div key={person.position}>
          <div className={
            person.position % 2 == 0
              ? 'people-right-container'
              : 'people-left-container'
          }>
            <img
              className={
                person.position % 2 == 0
                  ? 'people-right-image'
                  : 'people-left-image'
              }
              alt={t('speakersAndOrganisers.personAlt') + person.name}
              src={process.env.PUBLIC_URL + directory + person.picture} />
            <div className={person.position % 2 == 0 ? 'people-right-text-container' : ''}>
              <p
                className={
                  person.position % 2 == 0
                    ? 'people-right-name'
                    : 'people-left-name'
                }>
                {person.name}
              </p>
              <p
                className={
                  person.position % 2 == 0
                    ? 'people-right-description'
                    : 'people-left-description'
                }>
                {person.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  }
}

function Speakers(props: TabPanelProps) {
  const type = 'speakers'
  const [people, setPeople] = useState(new Array<PersonJSON>)
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)
  
  useEffect(() => {
    getPeopleSorted(type)
      .then((res) => {
        setPeople(res)
        setLoaded(1)
      })
      .catch((reason) => {
        console.log(reason)
        setLoaded(2)
      })
  }, [])
  
  if (props.index == props.value) {
    if (loaded === 1) {
      return <PeopleListView people={people} type={type} />
    } else if (loaded == 2) {
      return <p>Loading failed</p>
    } else {
      return <div className='people-loading-container'>
        <CircularProgress />
      </div>
    }
  } else {
    return <></>
  }
}

function Organisers(props: TabPanelProps) {
  const type = 'organisers'
  const [people, setPeople] = useState(new Array<PersonJSON>)
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)
  
  useEffect(() => {
    getPeopleSorted(type)
      .then((res) => {
        setPeople(res)
        setLoaded(1)
      })
      .catch((reason) => {
        console.log(reason)
        setLoaded(2)
      })
  }, [])

  if (props.index == props.value) {
    if (loaded === 1) {
      return <PeopleListView people={people} type={type} />
    } else if (loaded == 2) {
      return <p>Loading failed</p>
    } else {
      return <div className='people-loading-container'>
        <CircularProgress />
      </div>
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
  const [tab, setTab] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
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
