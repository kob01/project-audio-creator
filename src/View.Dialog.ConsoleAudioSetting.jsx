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
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteIcon from '@mui/icons-material/Delete'

import Imitation from './utils.imitation'

import { loadAudioBuffer, playAudioBuffer, analyseAudioBuffer } from './utils.audio'
import { TextFieldSX } from './utils.mui.sx'

function AnalyseSource(props) {

}

function ControlCode(props) {
  const [codePress, setCodePress] = React.useState([])
  const [codePressRecord, setCodePressRecord] = React.useState([])
  const [codePressCallback, setCodePressCallback] = React.useState()

  const reset = () => {
    setCodePress([])
    setCodePressRecord([])
    setCodePressCallback()
  }

  React.useEffect(() => {
    if (codePressCallback === undefined) return

    const keydown = (e) => {
      const result = codePress.includes(e.code) ? codePress : [...codePress, e.code]
      setCodePress(result)

      const record = codePressRecord.includes(e.code) ? codePressRecord : [...codePressRecord, e.code]
      setCodePressRecord(record)
      codePressCallback.callback(record)
    }

    const keyup = (e) => {
      const result = codePress.filter(i => !i.includes(e.code))
      setCodePress(result)

      if (result.length === 0) reset()
    }

    const click = (e) => reset()

    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)
    window.addEventListener('click', click)

    return () => {
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
      window.removeEventListener('click', click)
    }
  }, [codePress, codePressRecord, codePressCallback])

  return props.children(codePressCallback, setCodePressCallback)
}

function App() {
  const [source, setSource] = React.useState()

  const onClose = () => Imitation.assignState({ dialogConsoleAudioSetting: null })

  const onSave = () => {
    const target = {}

    const keys = ['id', 'use', 'volume', 'rate', 'when', 'offset', 'duration']

    keys.forEach(i => target[i] = source[i])

    Object.assign(Imitation.state.dialogConsoleAudioSetting, target)

    Imitation.dispatch()
  }

  const onDelete = () => {
    Imitation.setState(pre => { pre.consoleCurrent.group = pre.consoleCurrent.group.filter(i => i !== pre.dialogConsoleAudioSetting); return pre; })
  }

  const play = async (source) => {
    const audioBuffer = await loadAudioBuffer(source)

    playAudioBuffer(audioBuffer)
  }

  const reset = async (source) => {
    setSource({ ...source, ...Imitation.state.dialogConsoleAudioSetting })
  }

  const init = async () => {
    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.find(i => i.id === Imitation.state.dialogConsoleAudioSetting.id)))

    const source = await loadAudioBuffer({ ...audio, ...Imitation.state.dialogConsoleAudioSetting })

    setSource(source)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }

  React.useEffect(async () => {

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
          Volume {source.volume}
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.volume} onChange={(e, v) => { setSource({ ...source, volume: v }) }} min={0} max={2} step={0.1} />
        </Grid>

        <Grid item xs={12}>
          Rate {source.rate}
        </Grid>
        <Grid item xs={12}>
          <Slider value={source.rate} onChange={(e, v) => { setSource({ ...source, rate: v }) }} min={0} max={2} step={0.1} />
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

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: '0 8px' }} variant='contained' color={source.use ? 'primary' : 'inherit'} onClick={(e) => { setSource({ ...source, use: !source.use }) }}><SendIcon style={{ marginRight: 4 }} />Use</Button>
          <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => play(source)}><PlayArrowIcon style={{ marginRight: 4 }} />Play</Button>
          <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => reset(source)}><RestoreIcon style={{ marginRight: 4 }} />Reset</Button>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { onDelete(); onClose(); }} color='error'><DeleteIcon style={{ marginRight: 4 }} />Delete</Button>
      <Button variant='contained' onClick={() => { onSave(); onClose(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default Imitation.withBindRender(App, state => [state.dialogConsoleAudioSetting, JSON.stringify(state.consoleCurrent), JSON.stringify(state.audio)])