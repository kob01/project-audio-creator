import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SaveIcon from '@mui/icons-material/Save'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer, playAudioBuffer } from './utils.audio'

function App() {
  const [value, setValue] = React.useState([])

  const onClose = () => Imitation.assignState({ dialogAudioMultipleSetting: false })

  const onSave = () => {
    value.forEach(i => {
      const audioSetting = Imitation.state.audioSetting.find(i_ => i_.id === i.id)

      if (audioSetting) Object.assign(audioSetting, i)
      if (!audioSetting) Imitation.state.audioSetting.push(i)
    })

    Imitation.state.audioSetting.forEach(i => {
      const audio = Imitation.state.audio.find(i_ => i_.id === i.id)

      if (JSON.stringify(i) === JSON.stringify(audio)) Imitation.state.audioSetting = Imitation.state.audioSetting.filter(i_ => i_.id !== i.id)
    })

    Imitation.assignState({ audioSetting: [...Imitation.state.audioSetting] })
  }

  const play = async (e, source) => {
    e.stopPropagation()

    const audioBuffer = await loadAudioBuffer(source)

    playAudioBuffer(audioBuffer)
  }

  React.useEffect(() => {

    if (Imitation.state.dialogAudioMultipleSetting === true && Imitation.state.audioMultipleSetting !== '') {
      const value = JSON.parse(JSON.stringify(Imitation.state.audio.filter(i => i._id === Imitation.state.audioMultipleSetting)))

      value.forEach(i => {
        const audioSetting = Imitation.state.audioSetting.find(i_ => i_.id === i.id)

        if (audioSetting) Object.assign(i, audioSetting)
      })

      setValue(value)
    }

  }, [Imitation.state.dialogAudioMultipleSetting, Imitation.state.audioMultipleSetting])

  return <Dialog open={Imitation.state.dialogAudioMultipleSetting} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        {
          value.map((i, index) => {
            return <Grid key={index} item xs={12}>
              <Accordion>
                <AccordionSummary>{i.name}</AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      Volume {i.volume}
                    </Grid>
                    <Grid item xs={12}>
                      <Slider value={i.volume} onChange={(e, v) => { i.volume = v; setValue([...value]) }} min={0} max={2} step={0.1} />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton color='primary' onClick={(e) => play(e, i)}><PlayArrowIcon /></IconButton>
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