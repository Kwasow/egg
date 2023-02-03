import React, { useEffect, useState, SyntheticEvent } from 'react'
import { Card, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SpeakersTab, SpeakersTabs } from '../utils/MUITheme'
import './ExpertsAndSpeakers.css'

const about_pl = 'Studenckie Koło Naukowe przy II Katedrze i Klinice \
Położnictwa i Ginekologii WUM działa już od 1982 roku. Kołem opiekują się \
wspaniałe lekarki: dr hab. n. med. Ewa Romejko-Wolniewicz oraz dr Agnieszka \
Dobrowolska-Redo. Spotykamy się co dwa tygodnie w szpitalu na ulicy Karowej 2 \
w II Katedrze i Klinice Położnictwa i Ginekologii WUM, której kierownikiem \
jest prof. dr hab. n. med. Krzysztof Czajkowski. Omawiane na spotkaniach \
zagadnienia zdecydowanie wykraczają poza wiadomości przekazywane nam w trakcie \
codziennych zajęć na uczelni, jednocześnie nie ograniczając się do tematyki \
ginekologicznej - na spotkaniach gościli już interniści, naukowcy, lekarze \
medycyny ratunkowej i anestezjolodzy.'

const about_en = '[TODO] ' + about_pl

const topPersonDescription = 'ENYGO President, Fondazione Policlinico \
Universitario A. Gemelli, IRCCS, UOC Ginecologia Oncologica, Dipartimento per \
la Salute della Donna e del Bambino e della Salute Pubblica, Rome, Italy'

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
  description_pl: string;
  description_en: string;
  picture: string;
}

async function getPeopleSorted(type: string): Promise<PersonJSON[]> {
  const phpUrl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? process.env.PUBLIC_URL + 'php/getPeople-' + type + '.json'
    : process.env.PUBLIC_URL + 'php/getPeople.php?type=' + type
  const directory = process.env.PUBLIC_URL + 'static/' + type

  console.log(phpUrl)

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
  const { t, i18n } = useTranslation()
  const directory = process.env.PUBLIC_URL + 'static/' + props.type + '/'

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
              alt={t('expertsAndSpeakers.personAlt') + person.name}
              src={directory + person.picture} />
            <div className={
              person.position % 2 == 0
                ? 'people-right-text-container'
                : ''
            }>
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
                {i18n.language == 'pl'
                  ? person.description_pl
                  : person.description_en
                }
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
  const { i18n } = useTranslation()
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
      return <>
        <Card sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '2%',
          backgroundColor: '#c53d63',
        }}>
          <div className='about-us-card-left-container'>
            <p className='about-us-title'>
              {t('expertsAndSpeakers.aboutUs')}</p>
            <div className='about-us-inner-container'>
              <img className='about-us-logo'
                alt={t('expertsAndSpeakers.logoAlt') || ''}
                src={process.env.PUBLIC_URL + '/static/images/logokolo.jpg'} />
              <p className='about-us-text'>
                {i18n.language === 'pl' ? about_pl : about_en}
              </p>
            </div>
            <p className='about-us-title' style={{
              visibility: 'hidden'
            }}>{t('expertsAndSpeakers.aboutUs')}</p>
          </div>
          <img className='about-us-image' src='/static/images/us.jpg' />
        </Card>
        <PeopleListView people={people} type={type} />
      </>
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

function ExpertsAndSpeakers() {
  const { t } = useTranslation()
  const [tab, setTab] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return <>
    <div className='top-person-wrap'>
      <img src={process.env.PUBLIC_URL + '/static/images/top-guest.png'} />
      <div className='top-person-text'>
        <p className='people-left-name' style={{
          marginBottom: 0
        }}>Nicolò Bizzarri</p>
        <p className='top-person-subtext'>
          {t('expertsAndSpeakers.specialGuest')}
        </p>
        <p>{topPersonDescription}</p>
      </div>
    </div>
    <SpeakersTabs value={tab} onChange={handleChange} variant='fullWidth'>
      <SpeakersTab
        label={t('expertsAndSpeakers.experts')} {...a11yProps(0)} />
      <SpeakersTab
        label={t('expertsAndSpeakers.speakers')} {...a11yProps(1)} />
    </SpeakersTabs>
    <Speakers value={tab} index={0} />
    <Organisers value={tab} index={1} />
  </>
}

export default ExpertsAndSpeakers
