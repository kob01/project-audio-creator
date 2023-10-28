import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestoreIcon from '@mui/icons-material/Restore'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer, playAudioBuffer } from './utils.audio'
import { TextFieldSX } from './utils.mui.sx'

function App() {
  const [source, setSource] = React.useState()

  const onClose = () => Imitation.assignState({ dialogAudioSingleSetting: false })

  const onSave = () => {
    const target = {}

    const keys = ['id', 'use', 'name', 'volume', 'when', 'offset', 'duration', 'codeInclued', 'codeExclude', 'codeMain']

    keys.forEach(i => target[i] = source[i])

    const audioSetting = Imitation.state.audioSetting.find(i => i.id === target.id)

    const audio = Imitation.state.audio.find(i => i.id === target.id)

    if (audioSetting) Object.assign(audioSetting, target)

    if (!audioSetting) Imitation.state.audioSetting.push(target)

    if (keys.every(i => target[i] === audio[i])) Imitation.state.audioSetting = Imitation.state.audioSetting.filter(i => i.id !== target.id)

    Imitation.assignState({ audioSetting: [...Imitation.state.audioSetting] })
  }

  const play = async (source) => {
    const audioBuffer = await loadAudioBuffer(source)

    playAudioBuffer(audioBuffer)
  }

  const reset = async (source) => {
    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.find(i => i.id === source.id)))

    const source_ = await loadAudioBuffer(audio)

    setSource(source_)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }

  const init = async () => {
    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    const setting = Imitation.state.audioSetting.find(i => i.id === Imitation.state.audioSingleSetting)

    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.find(i => i.id === Imitation.state.audioSingleSetting)))

    const source = await loadAudioBuffer(audio)

    Object.assign(source, setting)

    setSource(source)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }

  React.useEffect(async () => {

    if (Imitation.state.dialogAudioSingleSetting === true && Imitation.state.audioSingleSetting !== '') {
      init()
    }

  }, [Imitation.state.dialogAudioSingleSetting, Imitation.state.audioSingleSetting])

  if (source === undefined) return null

  return <Dialog open={Imitation.state.dialogAudioSingleSetting} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Id' value={source.id} disabled />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Name' value={source.name} onChange={e => setSource({ ...source, name: e.target.value })} />
        </Grid>

        <Grid item xs={12}>
          Volume {source.volume}
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.volume} onChange={(e, v) => { setSource({ ...source, volume: v }) }} min={0} max={2} step={0.1} />
        </Grid>

        <Grid item xs={12}>
          When {source.when}
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.when} onChange={(e, v) => { setSource({ ...source, when: v }) }} min={0} max={(source.when) + 10} step={0.1} />
        </Grid>

        <Grid item xs={12}>
          Offset {source.offset}
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.offset} onChange={(e, v) => { setSource({ ...source, offset: v }) }} min={0} max={source.audioBuffer.duration} step={0.001} />
        </Grid>

        <Grid item xs={12}>
          Duration {source.duration}
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.duration} onChange={(e, v) => { setSource({ ...source, duration: v }) }} min={0} max={source.audioBuffer.duration} step={0.001} />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Code Inclued' value={source.codeInclued.join(' ')} />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Code Exclude' value={source.codeExclude.join(' ')} />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Code Main' value={source.codeMain.join(' ')} />
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: '0 8px' }} variant='contained' color={source.use ? 'primary' : 'inherit'} onClick={(e) => { setSource({ ...source, use: !source.use }) }}><SendIcon style={{ marginRight: 4 }} />Use</Button>
          <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => play(source)}><PlayArrowIcon style={{ marginRight: 4 }} />Play</Button>
          <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => reset(source)}><RestoreIcon style={{ marginRight: 4 }} />Reset</Button>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { onSave(); onClose(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default App