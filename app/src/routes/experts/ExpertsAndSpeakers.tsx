import React, { useEffect, useState, SyntheticEvent, useRef } from 'react'
import { Card, CircularProgress, Grid, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SpeakersTab, SpeakersTabs } from '../../utils/MUITheme'
import './ExpertsAndSpeakers.css'
import { phpPrefix, resourcesPrefix } from '../../components/Shared'

interface TabPanelProps {
  index: number
  value: number
}

interface PersonJSON {
  position: number
  name: string
  description_pl: string[]
  description_en: string[]
  picture: string
}

interface PeopleJSON {
  list: PersonJSON[]
}

async function getPeopleSorted(type: string): Promise<PersonJSON[]> {
  const jsonURL =
    phpPrefix + (type === 'speakers' ? 'speakers/get.php' : 'getExperts.php')

  return new Promise((resolve, reject) => {
    fetch(jsonURL, { cache: 'no-store' })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((people: PeopleJSON) => {
        people.list.sort((a, b) => a.position - b.position)
        resolve(people.list)
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
  const { people } = props
  const { t, i18n } = useTranslation()
  const sunshineCount = useRef(0)

  if (people.length === 0) {
    return <AvailableSoon />
  }

  function Person(props: { person: PersonJSON; onClick?: () => void }) {
    const { person, onClick } = props

    return (
      <div className='grid-person-container' onClick={onClick}>
        <img
          className='grid-person-image'
          src={resourcesPrefix + person.picture}
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
  }

  return (
    <Grid
      container
      spacing={0}
      className='grid-container'
      style={{
        backgroundImage: 'url(static/images/background.svg)',
      }}
    >
      {people.map((person) => {
        if (person.name === 'Weronika Jędrzejczak') {
          return (
            <Person
              key={person.position}
              person={person}
              onClick={() => {
                sunshineCount.current = sunshineCount.current + 1
                if (sunshineCount.current === 9) {
                  window.open('/sunshine', '_self')
                }
              }}
            />
          )
        } else {
          return <Person key={person.position} person={person} />
        }
      })}
    </Grid>
  )
}

function PeopleListView(props: { people: PersonJSON[]; type: string }) {
  const { people, type } = props
  const { t, i18n } = useTranslation()
  const directory = process.env.PUBLIC_URL + 'static/' + type + '/'

  if (people.length === 0) {
    return <AvailableSoon />
  }

  function Description(props: { paragraphs: string[] }) {
    const { paragraphs } = props

    return (
      <>
        {paragraphs.map((paragraph, index) => {
          return (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          )
        })}
      </>
    )
  }

  function Person(props: { person: PersonJSON }) {
    const { person } = props

    return (
      <div>
        <div className='people-container'>
          <img
            className='people-image'
            alt={t('expertsAndSpeakers.PersonAlt') + person.name}
            src={directory + person.picture}
            loading='lazy'
          />
          <div>
            <p className='people-name'>{person.name}</p>
            <p className='people-description'>
              {i18n.language == 'pl' ? (
                <Description paragraphs={person.description_pl} />
              ) : (
                <Description paragraphs={person.description_en} />
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className='experts-container'
      style={{
        backgroundImage: 'url(static/images/background.svg)',
        backgroundRepeat: 'repeat-y',
        backgroundSize: '100% auto',
      }}
    >
      {people.map((person) => (
        <Person person={person} key={person.position} />
      ))}
    </div>
  )
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
  const theme = useTheme()
  const color = theme.palette.primary.main

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
          <Card className='about-us-card' sx={{ backgroundColor: color }}>
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

// Leftover from 2023 edition - might become useful in the future
// function TopPerson() {
//   const { t } = useTranslation()

//   return (
//     <div>
//       <div className='people-container'>
//         <img
//           className='people-image top-person-image'
//           src={process.env.PUBLIC_URL + '/static/images/top-guest.webp'}
//         />
//         <div>
//           <p className='people-name top-person-name'>dr Nicolò Bizzarri</p>
//           <p className='people-description top-person-description'>
//             <p className='top-person-subtext'>
//               {t('expertsAndSpeakers.SpecialGuest')}
//             </p>
//             <p className='top-person-text'>{topPersonDescription}</p>
//             <p className='top-person-speech'>
//               {t('expertsAndSpeakers.InauguralSpeech')}
//             </p>
//             <p className='top-person-subtext'>
//               {t('expertsAndSpeakers.InauguralDate')}
//             </p>
//             <p className='top-person-text'>{topPersonInauguralTitle}</p>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

function ExpertsAndSpeakers() {
  const { t } = useTranslation()
  const [tab, setTab] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <div>
      {/* <TopPerson /> */}
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
    </div>
  )
}

export default ExpertsAndSpeakers
