import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Paper from '@mui/material/Paper'

import Imitation from './utils.imitation'

function App() {
  const [value, setValue] = React.useState([])

  const onClose = () => Imitation.assignState({ dialogAudioMultipleSetting: false })

  const onSave = () => {
    value.forEach(i => {
      const find = Imitation.state.audioSetting.find(i_ => i.id === i_.id)

      if (find) Object.assign(find, i)
      if (!find) Imitation.state.audioSetting.push(i)
    })

    Imitation.assignState({ audioSetting: [...Imitation.state.audioSetting] })
  }

  React.useEffect(() => {

    if (Imitation.state.dialogAudioMultipleSetting === true && Imitation.state.audioMultipleSetting !== '') {
      const value = JSON.parse(JSON.stringify(Imitation.state.audio.filter(i => i._id === Imitation.state.audioMultipleSetting)))

      value.forEach(i => {
        const find = Imitation.state.audioSetting.find(i_ => i.id === i_.id)

        if (find) Object.assign(i, find)
      })

      setValue(value)
    }

  }, [Imitation.state.dialogAudioMultipleSetting, Imitation.state.audioMultipleSetting])

  return <Dialog open={Imitation.state.dialogAudioMultipleSetting} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 1080 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        {
          value.map((i, index) => {
            return <Grid key={index} item xs={12}>
              <Paper style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
                <Button style={{ marginRight: 8 }}>{i.name}</Button>
                <div style={{ width: 300 }}>
                  <div style={{ marginTop: 16 }}>Volume {i.volume}</div>
                  <Slider value={i.volume} onChange={(e, v) => { i.volume = v; setValue([...value]) }} min={0} max={2} step={0.1} />
                </div>
              </Paper>
            </Grid>
          })
        }

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { onSave(); onClose(); }}>Save</Button>
    </DialogActions>
  </Dialog >
}

export default App