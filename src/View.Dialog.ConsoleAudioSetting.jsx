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
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'

import Imitation from './utils.imitation'

import { loadAudioBuffer, playAudioContext } from './utils.audio'
import { TextFieldSX } from './utils.mui.sx'

function App() {
  const [source, setSource] = React.useState()

  const onClose = () => {
    Imitation.assignState({ dialogConsoleAudioSetting: null })
  }

  const onSave = () => {
    const target = {}

    const keys = ['id', 'use', 'volume', 'rate', 'when', 'offset', 'duration']

    keys.forEach(i => target[i] = source[i])

    const console = Imitation.state.console.reduce((t, i) => [...t, ...i.group], []).find(i => i.hash === Imitation.state.dialogConsoleAudioSetting.hash)

    Object.assign(console, target)

    Imitation.dispatch()
  }

  const onDelete = () => {
    const console = Imitation.state.console.find(i => i.group.find(i_ => i_.hash === Imitation.state.dialogConsoleAudioSetting.hash))

    console.group = console.group.filter(i => i.hash !== Imitation.state.dialogConsoleAudioSetting.hash)

    Imitation.dispatch()
  }

  const play = () => {
    playAudioContext(source)
  }

  const reset = () => {
    setSource({ ...source, ...Imitation.state.console.reduce((t, i) => [...t, ...i.group], []).find(i => i.hash === Imitation.state.dialogConsoleAudioSetting.hash) })
  }

  const init = async () => {
    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    const console = Imitation.state.console.reduce((t, i) => [...t, ...i.group], []).find(i => i.hash === Imitation.state.dialogConsoleAudioSetting.hash)

    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.find(i => i.id === Imitation.state.dialogConsoleAudioSetting.id)))

    const source = await loadAudioBuffer(audio)

    Object.assign(source, console)

    setSource(source)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }

  React.useEffect(() => {
    if (Imitation.state.dialogConsoleAudioSetting !== null) {
      init()
    }
  }, [Imitation.state.dialogConsoleAudioSetting])

  if (source === undefined) return null

  return <Dialog open={Imitation.state.dialogConsoleAudioSetting !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Id' value={source.id} disabled />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Name' value={source.name} disabled />
        </Grid>

        <Grid item xs={12}>
          Volume<span style={{ outline: 'none', marginLeft: 8 }} contentEditable='true' onBlur={e => isNaN(e.target.innerText) ? e.target.innerText = source.volume : setSource({ ...source, volume: Number(e.target.innerText) })}>{source.volume}</span>
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.volume} onChange={(e, v) => { setSource({ ...source, volume: v }) }} min={0} max={2} step={0.1} />
        </Grid>

        <Grid item xs={12}>
          Rate<span style={{ outline: 'none', marginLeft: 8 }} contentEditable='true' onBlur={e => isNaN(e.target.innerText) ? e.target.innerText = source.rate : setSource({ ...source, rate: Number(e.target.innerText) })}>{source.rate}</span>
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.rate} onChange={(e, v) => { setSource({ ...source, rate: v }) }} min={0} max={2} step={0.1} />
        </Grid>

        <Grid item xs={12}>
          When<span style={{ outline: 'none', marginLeft: 8 }} contentEditable='true' onBlur={e => isNaN(e.target.innerText) ? e.target.innerText = source.when : setSource({ ...source, when: Number(e.target.innerText) })}>{source.when}</span>
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.when} onChange={(e, v) => { setSource({ ...source, when: v }) }} min={0} max={source.when + 1} step={0.1} />
        </Grid>

        <Grid item xs={12}>
          Offset<span style={{ outline: 'none', marginLeft: 8 }} contentEditable='true' onBlur={e => isNaN(e.target.innerText) ? e.target.innerText = source.offset : setSource({ ...source, offset: Number(e.target.innerText) })}>{source.offset}</span>
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.offset} onChange={(e, v) => { setSource({ ...source, offset: v }) }} min={0} max={source.audioBuffer.duration} step={0.001} />
        </Grid>

        <Grid item xs={12}>
          Duration<span style={{ outline: 'none', marginLeft: 8 }} contentEditable='true' onBlur={e => isNaN(e.target.innerText) ? e.target.innerText = source.duration : setSource({ ...source, duration: Number(e.target.innerText) })}>{source.duration}</span>
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.duration} onChange={(e, v) => { setSource({ ...source, duration: v }) }} min={0} max={source.audioBuffer.duration} step={0.001} />
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: '0 8px' }} variant='contained' color={source.use ? 'primary' : 'inherit'} onClick={(e) => { setSource({ ...source, use: !source.use }) }}><SendIcon style={{ marginRight: 4 }} />Use</Button>
          <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => play()}><PlayArrowIcon style={{ marginRight: 4 }} />Play</Button>
          <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => reset()}><RestoreIcon style={{ marginRight: 4 }} />Reset</Button>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { onDelete(); onClose(); }} color='error'><DeleteIcon style={{ marginRight: 4 }} />Delete</Button>
      <Button variant='contained' onClick={() => { onSave(); onClose(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default Imitation.withBindRender(App, state => [state.dialogConsoleAudioSetting, JSON.stringify(state.console), JSON.stringify(state.audio)])