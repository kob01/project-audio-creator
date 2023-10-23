import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'

import MenuIcon from '@mui/icons-material/Menu'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import SettingsIcon from '@mui/icons-material/Settings'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

function Action() {
  return <>
    <Button style={{ margin: '4px 0', justifyContent: 'start' }} fullWidth variant='outlined' onClick={() =>  Imitation.assignState({ dialogCurrentAudioSetting: true })}><SettingsIcon style={{ marginRight: 4 }} />Current Audio Setting</Button>
    <Button style={{ margin: '4px 0', justifyContent: 'start' }} fullWidth variant='outlined' onClick={() =>  Imitation.assignState({ dialogGlobalSetting: true })}><SettingsIcon style={{ marginRight: 4 }} />Global Setting</Button>
  </>
}

function App() {
  const push = useHistory().push
  const pathname = useLocation().pathname

  const [drawer, setDrawer] = React.useState(false)

  return <>
    <Animation tag={Button} restore={true} animation={[{ transform: 'translate(0, -30px)', opacity: 0 }, { transform: 'translate(0, 0)', opacity: 1 }]} style={{ position: 'absolute', zIndex: 2, top: 16, left: 16, transition: '0.5s all' }} variant='contained' onClick={() => { push('/'); }}>
      Audio Creator
    </Animation>
    <Animation tag={Button} restore={true} animation={[{ transform: 'translate(0, -30px)', opacity: 0 }, { transform: 'translate(0, 0)', opacity: 1 }]} style={{ position: 'absolute', zIndex: 2, top: 16, right: 16, transition: '0.5s all' }} variant='outlined' onClick={() => setDrawer(true)}>
      <MenuIcon style={{ marginRight: 4 }} />APP
    </Animation>

    <Drawer anchor='left' open={drawer} onClose={() => setDrawer(false)} sx={{ '& .MuiPaper-root': { width: 304, height: '100%' } }} >
      <div style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto' }}>
        <div>
          <Button style={{ margin: '4px 0', justifyContent: 'start' }} fullWidth variant={pathname === '/SimplePiano' ? 'contained' : 'outlined'} onClick={() => { push('/SimplePiano'); setDrawer(false); }}><MusicNoteIcon style={{ marginRight: 4 }} />Simple Piano</Button>
          <Button style={{ margin: '4px 0', justifyContent: 'start' }} fullWidth variant={pathname === '/BassoonStacF1' ? 'contained' : 'outlined'} onClick={() => { push('/BassoonStacF1'); setDrawer(false); }}><MusicNoteIcon style={{ marginRight: 4 }} />Bassoon StacF1</Button>
        </div>

        <div>
          <Action />
        </div>
      </div>
    </Drawer>
  </>
}

export default App