import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestoreIcon from '@mui/icons-material/Restore'
import SaveIcon from '@mui/icons-material/Save'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer, playAudioBuffer } from './utils.audio'
import { TextFieldSX } from './utils.mui.sx'

function App() {
  const [source, setSource] = React.useState()

  const onClose = () => Imitation.assignState({ dialogAudioSingleSetting: false })

  const onSave = () => {
    const audioSetting = Imitation.state.audioSetting.find(i => i.id === source.id)

    const audio = Imitation.state.audio.find(i => i.id === source.id)

    if (audioSetting) Object.assign(audioSetting, source)

    if (!audioSetting) Imitation.state.audioSetting.push(source)

    if (['name', 'volume', 'when', 'offset', 'duration'].every(i => source[i] === audio[i])) Imitation.state.audioSetting = Imitation.state.audioSetting.filter(i => i.id !== source.id)

    Imitation.assignState({ audioSetting: [...Imitation.state.audioSetting] })
  }

  const play = async () => {
    const audioBuffer = await loadAudioBuffer(source)

    playAudioBuffer(audioBuffer)
  }

  const reset = async () => {
    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.find(i => i.id === Imitation.state.audioSingleSetting)))

    const source = await loadAudioBuffer(audio)

    setSource(source)

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

        <Grid item xs={12}>
          <TextField {...TextFieldSX} style={{ marginBottom: 8 }} fullWidth label='Id' value={source.id} disabled />
        </Grid>

        <Grid item xs={12}>
          <TextField {...TextFieldSX} style={{ marginBottom: 8 }} fullWidth label='Name' value={source.name} onChange={e => setSource({ ...source, name: e.target.value })} />
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
          <Slider value={source.when === undefined ? 0 : source.when} onChange={(e, v) => { setSource({ ...source, when: v }) }} min={0} max={5} step={0.1} />
        </Grid>

        <Grid item xs={12}>
          Offset {source.offset}
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.offset === undefined ? 0 : source.offset} onChange={(e, v) => { setSource({ ...source, offset: v }) }} min={0} max={source.audioBuffer.duration} step={0.001} />
        </Grid>

        <Grid item xs={12}>
          Duration {source.duration}
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.duration === undefined ? 0 : source.duration} onChange={(e, v) => { setSource({ ...source, duration: v }) }} min={0} max={source.audioBuffer.duration} step={0.001} />
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: '0 8px' }} variant='outlined' onClick={() => play()}><PlayArrowIcon style={{ marginRight: 4 }} />Play</Button>
          <Button style={{ margin: '0 8px' }} variant='outlined' onClick={() => reset()}><RestoreIcon style={{ marginRight: 4 }} />Reset</Button>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { onSave(); onClose(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default App