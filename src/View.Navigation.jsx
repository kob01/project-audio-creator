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

  const download = () => {
    const data = JSON.stringify({ audioSetting: Imitation.state.audioSetting, console: Imitation.state.console })

    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'library.json'
    link.click()

    URL.revokeObjectURL(url)
  }

  const upload = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result)

      Imitation.state.audioSetting = data.audioSetting
      Imitation.state.console = data.console
      Imitation.state.message = 'Loaded'

      Imitation.dispatch()
    }

    reader.readAsText(file)
  }

  return <>
    <Animation tag={Button} restore={true} animation={[{ transform: 'translate(0, -30px)', opacity: 0 }, { transform: 'translate(0, 0)', opacity: 1 }]} style={{ position: 'absolute', zIndex: 2, top: 16, left: 16, transition: '0.5s all' }} variant='contained' onClick={() => { push('/'); }}>
      Audio Creator
    </Animation>
    <Animation tag={Button} restore={true} animation={[{ transform: 'translate(0, -30px)', opacity: 0 }, { transform: 'translate(0, 0)', opacity: 1 }]} style={{ position: 'absolute', zIndex: 2, top: 16, right: 16, transition: '0.5s all' }} variant='outlined' onClick={() => Imitation.assignState({ navigationDrawer: true })}>
      <MenuIcon style={{ marginRight: 4 }} />APP
    </Animation>
    <Animation tag={Button} restore={true} animation={[{ transform: 'translate(0, -30px)', opacity: 0 }, { transform: 'translate(0, 0)', opacity: 1 }]} style={{ position: 'absolute', zIndex: 2, top: 16, right: 110, transition: '0.5s all' }} variant={Imitation.state.globalSetting.volume !== 0 ? 'contained' : 'outlined'} onClick={() => { Imitation.state.globalSetting.volume = Imitation.state.globalSetting.volume === 0 ? 1 : 0; Imitation.dispatch() }}>
      <VolumeMuteIcon style={{ marginRight: 4 }} />
    </Animation>

    <Drawer anchor='left' open={Imitation.state.navigationDrawer} onClose={() => Imitation.assignState({ navigationDrawer: false })} sx={{ '& .MuiPaper-root': { width: 304, height: '100%' } }} >
      <div style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto' }}>
        <div>
          <Button style={{ marginBottom: 4, justifyContent: 'start' }} fullWidth variant={pathname === '/SimplePiano' ? 'contained' : 'outlined'} onClick={() => { push('/SimplePiano'); Imitation.assignState({ navigationDrawer: false }); }}><MusicNoteIcon style={{ marginRight: 4 }} />Simple Piano</Button>
          <Button style={{ marginBottom: 4, justifyContent: 'start' }} fullWidth variant={pathname === '/BassoonStacF1' ? 'contained' : 'outlined'} onClick={() => { push('/BassoonStacF1'); Imitation.assignState({ navigationDrawer: false }); }}><MusicNoteIcon style={{ marginRight: 4 }} />Bassoon StacF1</Button>
        </div>

        <div>
          <Button style={{ marginTop: 4, justifyContent: 'start' }} fullWidth variant='outlined' onClick={() => download()}><SettingsIcon style={{ marginRight: 4 }} />Data Download</Button>
          <label>
            <Button style={{ marginTop: 4, justifyContent: 'start' }} fullWidth variant='outlined' component='div'><SettingsIcon style={{ marginRight: 4 }} />Data Upload</Button>
            <input type='file' style={{ display: 'none' }} onChange={(e) => upload(e)}></input>
          </label>
          <Button style={{ marginTop: 4, justifyContent: 'start' }} fullWidth variant='outlined' onClick={() => Imitation.assignState({ dialogGlobalSetting: true })}><SettingsIcon style={{ marginRight: 4 }} />Global Setting</Button>
        </div>
      </div>
    </Drawer>
  </>
}

export default Imitation.withBindRender(App, state => [state.navigationDrawer, JSON.stringify(state.globalSetting)])