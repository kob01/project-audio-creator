import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'

import MenuIcon from '@mui/icons-material/Menu'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import SettingsIcon from '@mui/icons-material/Settings'
import VolumeMuteIcon from '@mui/icons-material/VolumeMute'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

function App() {
  const push = useHistory().push
  const pathname = useLocation().pathname

  return <>
    <Animation tag={Button} restore={true} animation={[{ transform: 'translate(0, -30px)', opacity: 0 }, { transform: 'translate(0, 0)', opacity: 1 }]} style={{ position: 'absolute', zIndex: 1000, top: 16, left: 16, transition: '0.5s all' }} variant='contained' onClick={() => { push('/'); }}>
      Audio Creator
    </Animation>
    <Animation tag={Button} restore={true} animation={[{ transform: 'translate(0, -30px)', opacity: 0 }, { transform: 'translate(0, 0)', opacity: 1 }]} style={{ position: 'absolute', zIndex: 1000, top: 16, right: 16, transition: '0.5s all' }} variant='outlined' onClick={() => Imitation.assignState({ navigationDrawerExpand: true })}>
      <MenuIcon style={{ marginRight: 4 }} />APP
    </Animation>
    <Animation tag={Button} restore={true} animation={[{ transform: 'translate(0, -30px)', opacity: 0 }, { transform: 'translate(0, 0)', opacity: 1 }]} style={{ position: 'absolute', zIndex: 1000, top: 16, right: 110, transition: '0.5s all' }} variant={Imitation.state.globalSetting.volume !== 0 ? 'contained' : 'outlined'} onClick={() => { Imitation.state.globalSetting.volume = Imitation.state.globalSetting.volume === 0 ? 1 : 0; Imitation.dispatch() }}>
      <VolumeMuteIcon style={{ marginRight: 4 }} />
    </Animation>

    <Drawer anchor='left' open={Imitation.state.navigationDrawerExpand} onClose={() => Imitation.assignState({ navigationDrawerExpand: false })} sx={{ '& .MuiPaper-root': { width: 304, height: '100%' } }} >
      <div style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto' }}>
        <div>
          <Button style={{ marginBottom: 4, justifyContent: 'start' }} fullWidth variant={pathname === '/PianoV1' ? 'contained' : 'outlined'} onClick={() => { push('/PianoV1'); Imitation.assignState({ navigationDrawerExpand: false }); }}><MusicNoteIcon style={{ marginRight: 4 }} />Piano V1</Button>
          <Button style={{ marginBottom: 4, justifyContent: 'start' }} fullWidth variant={pathname === '/PianoV1M1' ? 'contained' : 'outlined'} onClick={() => { push('/PianoV1M1'); Imitation.assignState({ navigationDrawerExpand: false }); }}><MusicNoteIcon style={{ marginRight: 4 }} />Piano V1 M1</Button>
          <Button style={{ marginBottom: 4, justifyContent: 'start' }} fullWidth variant={pathname === '/BassoonStacF1' ? 'contained' : 'outlined'} onClick={() => { push('/BassoonStacF1'); Imitation.assignState({ navigationDrawerExpand: false }); }}><MusicNoteIcon style={{ marginRight: 4 }} />Bassoon Stac F1</Button>
        </div>

        <div>
          <Button style={{ marginTop: 4, justifyContent: 'start' }} fullWidth variant='outlined' onClick={() => Imitation.assignState({ dialogExample: true })}><SettingsIcon style={{ marginRight: 4 }} />Example</Button>
          <Button style={{ marginTop: 4, justifyContent: 'start' }} fullWidth variant='outlined' onClick={() => Imitation.assignState({ dialogLocalStorage: true })}><SettingsIcon style={{ marginRight: 4 }} />Local Storage</Button>
          <Button style={{ marginTop: 4, justifyContent: 'start' }} fullWidth variant='outlined' onClick={() => Imitation.assignState({ dialogGlobalSetting: true })}><SettingsIcon style={{ marginRight: 4 }} />Global Setting</Button>
        </div>
      </div>
    </Drawer>
  </>
}

export default Imitation.withBindRender(App, state => [state.navigationDrawerExpand, JSON.stringify(state.globalSetting)])