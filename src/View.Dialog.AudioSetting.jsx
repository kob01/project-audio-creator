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
import ClearAllIcon from '@mui/icons-material/ClearAll'

import Imitation from './utils.imitation'

import { loadAudioBuffer, playAudioContext } from './utils.audio'
import { TextFieldSX } from './utils.mui.sx'

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

  const onClose = () => {
    Imitation.assignState({ dialogAudioSetting: null })
  }

  const onSave = () => {
    const target = {}

    const keys = ['id', 'use', 'name', 'volume', 'rate', 'when', 'offset', 'duration', 'codeInclued', 'codeExclude', 'codeMain']

    keys.forEach(i => target[i] = source[i])

    const audioSetting = Imitation.state.audioSetting.find(i => i.id === target.id)

    const audio = Imitation.state.audio.find(i => i.id === target.id)

    if (audioSetting) Object.assign(audioSetting, target)

    if (!audioSetting) Imitation.state.audioSetting.push(target)

    if (keys.every(i => target[i] === audio[i])) Imitation.state.audioSetting = Imitation.state.audioSetting.filter(i => i.id !== target.id)

    Imitation.assignState({ audioSetting: [...Imitation.state.audioSetting] })
  }

  const play = () => {
    playAudioContext(source)
  }

  const reset = () => {
    setSource({ ...source, ...Imitation.state.audio.find(i => i.id === source.id) })
  }

  const init = async () => {
    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    const audioSetting = Imitation.state.audioSetting.find(i => i.id === Imitation.state.dialogAudioSetting.id)

    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.find(i => i.id === Imitation.state.dialogAudioSetting.id)))

    const source = await loadAudioBuffer(audio)

    Object.assign(source, audioSetting)

    setSource(source)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }

  React.useEffect(() => {
    if (Imitation.state.dialogAudioSetting !== null) {
      init()
    }
  }, [Imitation.state.dialogAudioSetting])

  if (source === undefined) return null

  return <Dialog open={Imitation.state.dialogAudioSetting !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers style={{ fontSize: 14 }}>
      <Grid container spacing={1}>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Id' value={source.id} disabled />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Name' value={source.name} onChange={e => setSource({ ...source, name: e.target.value })} />
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

        {
          window.ontouchstart === undefined ?
            <>

              <Grid item xs={12} style={{ marginBottom: 8 }}>
                <ControlCode>
                  {
                    (codePressCallback, setCodePressCallback) => {
                      return <div style={{ position: 'relative' }}>
                        <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Code Inclued' value={source.codeInclued.join(' ')} focused={Boolean(codePressCallback)} />
                        <SettingsIcon style={{ position: 'absolute', top: 0, bottom: 0, right: 32, margin: 'auto', cursor: 'pointer' }} fontSize='small' color='primary' onClick={() => { setCodePressCallback({ callback: (v) => setSource({ ...source, codeInclued: v }) }) }} />
                        <ClearAllIcon style={{ position: 'absolute', top: 0, bottom: 0, right: 8, margin: 'auto', cursor: 'pointer' }} fontSize='small' color='primary' onClick={() => { setSource({ ...source, codeInclued: [] }) }} />
                      </div>
                    }
                  }
                </ControlCode>
              </Grid>

              <Grid item xs={12} style={{ marginBottom: 8 }}>
                <ControlCode>
                  {
                    (codePressCallback, setCodePressCallback) => {
                      return <div style={{ position: 'relative' }}>
                        <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Code Exclude' value={source.codeExclude.join(' ')} focused={Boolean(codePressCallback)} />
                        <SettingsIcon style={{ position: 'absolute', top: 0, bottom: 0, right: 32, margin: 'auto', cursor: 'pointer' }} fontSize='small' color='primary' onClick={() => { setCodePressCallback({ callback: (v) => setSource({ ...source, codeExclude: v }) }) }} />
                        <ClearAllIcon style={{ position: 'absolute', top: 0, bottom: 0, right: 8, margin: 'auto', cursor: 'pointer' }} fontSize='small' color='primary' onClick={() => { setSource({ ...source, codeExclude: [] }) }} />
                      </div>
                    }
                  }
                </ControlCode>
              </Grid>

              <Grid item xs={12} style={{ marginBottom: 8 }}>
                <ControlCode>
                  {
                    (codePressCallback, setCodePressCallback) => {
                      return <div style={{ position: 'relative' }}>
                        <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Code Main' value={source.codeMain.join(' ')} focused={Boolean(codePressCallback)} />
                        <SettingsIcon style={{ position: 'absolute', top: 0, bottom: 0, right: 32, margin: 'auto', cursor: 'pointer' }} fontSize='small' color='primary' onClick={() => { setCodePressCallback({ callback: (v) => setSource({ ...source, codeMain: v }) }) }} />
                        <ClearAllIcon style={{ position: 'absolute', top: 0, bottom: 0, right: 8, margin: 'auto', cursor: 'pointer' }} fontSize='small' color='primary' onClick={() => { setSource({ ...source, codeMain: [] }) }} />
                      </div>
                    }
                  }
                </ControlCode>
              </Grid>

            </>
            : null
        }

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: '0 8px' }} variant='contained' color={source.use ? 'primary' : 'inherit'} onClick={(e) => { setSource({ ...source, use: !source.use }) }}><SendIcon style={{ marginRight: 4 }} />Use</Button>
          <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => play()}><PlayArrowIcon style={{ marginRight: 4 }} />Play</Button>
          <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => reset()}><RestoreIcon style={{ marginRight: 4 }} />Reset</Button>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { onSave(); onClose(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default Imitation.withBindRender(App, state => [state.dialogAudioSetting, JSON.stringify(state.audioSetting), JSON.stringify(state.audio)])