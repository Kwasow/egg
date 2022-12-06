import React from 'react'
import { useTranslation } from 'react-i18next'
import { SpeakersTab, SpeakersTabs } from '../utils/MUITheme'

interface TabPanelProps {
  index: number;
  value: number;
}

function Speakers(props: TabPanelProps) {
  const dataPath = ''

  if (props.index == props.value) {
    return <p>Mówcy<br></br> Data path: {dataPath}</p>
  } else {
    return <></>
  }
}

function Organisers(props: TabPanelProps) {
  const dataPath = ''

  if (props.index == props.value) {
    return <p>Organizatorzy<br></br> Data path: {dataPath}</p>
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
