import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestoreIcon from '@mui/icons-material/Restore'
import SaveIcon from '@mui/icons-material/Save'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer, playAudioBuffer } from './utils.audio'
import { TextFieldSX } from './utils.mui.sx'

function App() {
  const [source, setSource] = React.useState()

  const onClose = () => Imitation.assignState({ dialogAudioMultipleSetting: false })

  const onSave = () => {
    value.forEach(i => {
      const audioSetting = Imitation.state.audioSetting.find(i_ => i_.id === i.id)

      if (audioSetting) Object.assign(audioSetting, i)

      if (!audioSetting) Imitation.state.audioSetting.push(i)
    })

    Imitation.state.audioSetting.forEach(i => {
      const audio = Imitation.state.audio.find(i_ => i_.id === i.id)

      if (['name', 'volume', 'when', 'offset', 'duration'].every(i_ => i[i_] === audio[i_])) Imitation.state.audioSetting = Imitation.state.audioSetting.filter(i_ => i_.id !== i.id)
    })

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

    Object.assign(source, source_)

    setSource(pre => [...pre])

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }

  const init = async () => {
    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.filter(i => i._id === Imitation.state.audioMultipleSetting)))

    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    const process = {
      index: 0,

      done: false,

      next: () => {
        const current = audio[process.index]

        if (current !== undefined) Object.assign(current, Imitation.state.audioSetting.find(i_ => current.id === i_.id))

        if (current === undefined) process.done = true

        process.index = process.index + 1
      }
    }

    await requestIdleCallbackProcess(process)

    const source = await loadAudioBuffer(audio)

    setSource(source)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }

  React.useEffect(async () => {

    if (Imitation.state.dialogAudioMultipleSetting === true && Imitation.state.audioMultipleSetting !== '') {
      init()
    }

  }, [Imitation.state.dialogAudioMultipleSetting, Imitation.state.audioMultipleSetting])

  if (source === undefined) return null

  return <Dialog open={Imitation.state.dialogAudioMultipleSetting} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        {
          source.map((i, index) => {
            return <Grid key={index} item xs={12}>
              <Accordion>
                <AccordionSummary>{i.name}</AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>

                    <Grid item xs={12}>
                      <TextField {...TextFieldSX} style={{ marginBottom: 8 }} fullWidth label='Id' value={i.id} disabled />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField {...TextFieldSX} style={{ marginBottom: 8 }} fullWidth label='Name' value={i.name} onChange={e => { i.source = e.target.value; setSource([...source]); }} />
                    </Grid>

                    <Grid item xs={12}>
                      Volume {i.volume}
                    </Grid>
                    <Grid item xs={12}>
                      <Slider value={i.volume} onChange={(e, v) => { i.volume = v; setSource([...source]); }} min={0} max={2} step={0.1} />
                    </Grid>

                    <Grid item xs={12}>
                      When {i.when}
                    </Grid>
                    <Grid item xs={12}>
                      <Slider value={i.when === undefined ? 0 : i.when} onChange={(e, v) => { i.when = v; setSource([...source]); }} min={0} max={5} step={0.1} />
                    </Grid>

                    <Grid item xs={12}>
                      Offset {i.offset}
                    </Grid>
                    <Grid item xs={12}>
                      <Slider value={i.offset === undefined ? 0 : i.offset} onChange={(e, v) => { i.offset = v; setSource([...source]); }} min={0} max={i.audioBuffer.duration} step={0.001} />
                    </Grid>

                    <Grid item xs={12}>
                      Duration {i.duration}
                    </Grid>
                    <Grid item xs={12}>
                      <Slider value={i.duration === undefined ? 0 : i.duration} onChange={(e, v) => { i.duration = v; setSource([...source]); }} min={0} max={i.audioBuffer.duration} step={0.001} />
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button style={{ margin: '0 8px' }} variant='outlined' onClick={() => play(i)}><PlayArrowIcon style={{ marginRight: 4 }} />Play</Button>
                      <Button style={{ margin: '0 8px' }} variant='outlined' onClick={() => reset(i)}><RestoreIcon style={{ marginRight: 4 }} />Reset</Button>
                    </Grid>

                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          })
        }

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { onSave(); onClose(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog >
}

export default App