import React, { useEffect, useState, SyntheticEvent } from 'react'
import { Card, CircularProgress, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SpeakersTab, SpeakersTabs } from '../utils/MUITheme'
import './ExpertsAndSpeakers.css'

const topPersonDescription =
  'ENYGO President, Fondazione Policlinico \
Universitario A. Gemelli, IRCCS, UOC Ginecologia Oncologica, Dipartimento per \
la Salute della Donna e del Bambino e della Salute Pubblica, Rome, Italy'

const topPersonInauguralTitle =
  'Building a Personalized Medicine \
Infrastructure for Gynecological Oncology Patients in a High-Volume Hospital'

interface TabPanelProps {
  index: number
  value: number
}

interface Description {
  list: string[]
}

interface PersonJSON {
  position: number
  name: string
  description_pl: string
  description_en: string
  picture: string
}

async function getPeopleSorted(type: string): Promise<PersonJSON[]> {
  const phpUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? process.env.PUBLIC_URL + 'php/getPeople-' + type + '.json'
      : process.env.PUBLIC_URL + 'php/getPeople.php?type=' + type
  const directory = process.env.PUBLIC_URL + 'static/' + type

  console.log(phpUrl)

  return new Promise((resolve, reject) => {
    fetch(phpUrl + '&cachePrevent=' + Date.now(), { cache: 'no-store' })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((description: Description) => {
        const urls = description.list.map((value) => directory + '/' + value)
        const requests = urls.map((url) => {
          return fetch(url, { cache: 'no-store' })
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

function AvailableSoon() {
  const { t } = useTranslation()

  return (
    <div className='available-soon-wrapper'>
      <img
        className='available-soon-logo'
        src={process.env.PUBLIC_URL + 'static/images/main0.webp'}
        alt={t('navbar.LogoAlt') || ''}
      />
      <p className='available-soon-text'>
        {t('expertsAndSpeakers.AvailableSoon')}
      </p>
    </div>
  )
}

function PeopleGridView(props: { people: PersonJSON[]; type: string }) {
  const { people, type } = props
  const { t, i18n } = useTranslation()
  const directory = process.env.PUBLIC_URL + 'static/' + type + '/'

  if (people.length === 0) {
    return <AvailableSoon />
  }

  return (
    <Grid container spacing={0} className='grid-container'>
      {people.map((person) => {
        return (
          <div key={person.position} className='grid-person-container'>
            <img
              className='grid-person-image'
              src={directory + person.picture}
              alt={t('expertsAndSpeakers.PersonAlt') + person.name}
              loading='lazy'
            />
            <p className='grid-person-title'>{person.name}</p>
            <p className='grid-person-subtitle'>
              {i18n.language == 'pl'
                ? person.description_pl
                : person.description_en}
            </p>
          </div>
        )
      })}
    </Grid>
  )
}

enum ScreenSize {
  BIG,
  SMALL,
}

function PeopleListView(props: { people: PersonJSON[]; type: string }) {
  const { people, type } = props
  const { t, i18n } = useTranslation()
  const directory = process.env.PUBLIC_URL + 'static/' + type + '/'
  const [screenSize, setScreenSize] = useState(ScreenSize.BIG)

  function updateScreenSize() {
    if (window.innerWidth < 900) {
      setScreenSize(ScreenSize.SMALL)
    } else {
      setScreenSize(ScreenSize.BIG)
    }
  }

  window.addEventListener('resize', updateScreenSize)
  useEffect(updateScreenSize, [])

  if (people.length === 0) {
    return <AvailableSoon />
  }

  if (screenSize === ScreenSize.BIG) {
    return (
      <div>
        {people.map((person) => (
          <div key={person.position}>
            <div
              className={
                person.position % 2 == 0
                  ? 'people-right-container'
                  : 'people-left-container'
              }
            >
              <img
                className='people-image'
                alt={t('expertsAndSpeakers.PersonAlt') + person.name}
                src={directory + person.picture}
                loading='lazy'
              />
              <div
                className={
                  person.position % 2 == 0 ? 'people-right-text-container' : ''
                }
              >
                <p
                  className={
                    person.position % 2 == 0
                      ? 'people-right-name'
                      : 'people-left-name'
                  }
                >
                  {person.name}
                </p>
                <p
                  className={
                    person.position % 2 == 0
                      ? 'people-right-description'
                      : 'people-left-description'
                  }
                >
                  {i18n.language == 'pl'
                    ? person.description_pl
                    : person.description_en}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div>
        {people.map((person) => (
          <div key={person.position} className='person-small-container'>
            <img
              className='people-image'
              alt={t('expertsAndSpeakers.PersonAlt') + person.name}
              src={directory + person.picture}
            />
            <p className='person-small-name'>{person.name}</p>
            <p className='person-small-description'>
              {i18n.language == 'pl'
                ? person.description_pl
                : person.description_en}
            </p>
          </div>
        ))}
      </div>
    )
  }
}

function Experts(props: TabPanelProps) {
  const type = 'experts'
  const [people, setPeople] = useState(new Array<PersonJSON>())
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
      .catch((err) => {
        console.error(err)
        setLoaded(2)
      })
  }, [])

  if (props.index == props.value) {
    if (loaded === 1) {
      return <PeopleListView people={people} type={type} />
    } else if (loaded == 2) {
      return <p>Loading failed</p>
    } else {
      return (
        <div className='people-loading-container'>
          <CircularProgress />
        </div>
      )
    }
  } else {
    return <></>
  }
}

function Speakers(props: TabPanelProps) {
  const type = 'speakers'
  const [people, setPeople] = useState(new Array<PersonJSON>())
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    getPeopleSorted(type)
      .then((res) => {
        setPeople(res)
        setLoaded(1)
      })
      .catch((err) => {
        console.error(err)
        setLoaded(2)
      })
  }, [])

  if (props.index == props.value) {
    if (loaded === 1) {
      return (
        <>
          <Card className='about-us-card' sx={{ backgroundColor: '#c53d63' }}>
            <div className='about-us-card-left-container'>
              <p className='about-us-title'>
                {t('expertsAndSpeakers.AboutUs')}
              </p>
              <div className='about-us-inner-container'>
                <img
                  className='about-us-logo'
                  alt={t('expertsAndSpeakers.LogoAlt') || ''}
                  src={process.env.PUBLIC_URL + '/static/images/logokolo.webp'}
                />
                <p className='about-us-text'>
                  {t('expertsAndSpeakers.AboutUsText')}
                </p>
              </div>
            </div>
            <img className='about-us-image' src='/static/images/us.webp' />
          </Card>
          <PeopleGridView people={people} type={type} />
        </>
      )
    } else if (loaded == 2) {
      return <p>Loading failed</p>
    } else {
      return (
        <div className='people-loading-container'>
          <CircularProgress />
        </div>
      )
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

function TopPerson() {
  const { t } = useTranslation()

  return (
    <div className='top-person-wrap'>
      <img
        className='top-person-image'
        src={process.env.PUBLIC_URL + '/static/images/top-guest.webp'}
      />
      <div className='top-person-text'>
        <p className='top-person-name'>dr Nicolò Bizzarri</p>
        <p className='top-person-subtext'>
          {t('expertsAndSpeakers.SpecialGuest')}
        </p>
        <p>{topPersonDescription}</p>
        <p className='top-person-speech'>
          {t('expertsAndSpeakers.InauguralSpeech')}
        </p>
        <p className='top-person-subtext'>
          {t('expertsAndSpeakers.InauguralDate')}
        </p>
        <p>{topPersonInauguralTitle}</p>
      </div>
    </div>
  )
}

function ExpertsAndSpeakers() {
  const { t } = useTranslation()
  const [tab, setTab] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <>
      <TopPerson />
      <SpeakersTabs value={tab} onChange={handleChange} variant='fullWidth'>
        <SpeakersTab
          label={t('expertsAndSpeakers.Experts')}
          {...a11yProps(0)}
        />
        <SpeakersTab
          label={t('expertsAndSpeakers.Speakers')}
          {...a11yProps(1)}
        />
      </SpeakersTabs>
      <Experts value={tab} index={0} />
      <Speakers value={tab} index={1} />
    </>
  )
}

export default ExpertsAndSpeakers
