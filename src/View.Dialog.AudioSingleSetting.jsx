import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'

import Imitation from './utils.imitation'

import { loadAudioBuffer, playAudioBuffer } from './utils.audio'

function App() {
  const [value, setValue] = React.useState()
  const [source, setSource] = React.useState()

  const onClose = () => Imitation.assignState({ dialogAudioSingleSetting: false })

  const onSave = () => {
    const find = Imitation.state.audioSetting.find(i_ => value.id === i_.id)

    if (find) Object.assign(find, value)
    if (!find) Imitation.state.audioSetting.push(value)

    Imitation.assignState({ audioSetting: [...Imitation.state.audioSetting] })
  }

  React.useEffect(async () => {

    if (Imitation.state.dialogAudioSingleSetting === true && Imitation.state.audioSingleSetting !== '') {
      Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

      setValue(Imitation.state.audioSetting.find(i => i.id === Imitation.state.audioSingleSetting))

      const source = await loadAudioBuffer(Imitation.state.audio.find(i => i.id === Imitation.state.audioSingleSetting))

      setSource(source)

      Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
    }

  }, [Imitation.state.dialogAudioSingleSetting, Imitation.state.audioSingleSetting])

  return <Dialog open={Imitation.state.dialogAudioSingleSetting} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        {/* <Grid item xs={12}>
          Volume {value.volume}
        </Grid>
        <Grid item xs={12}>
          <Slider value={value.volume} onChange={(e, v) => { setValue({ ...value, volume: v }) }} min={0} max={2} step={0.1} />
        </Grid> */}

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { Imitation.assignState({ setting: value }); onClose(); }}>Save</Button>
    </DialogActions>
  </Dialog>
}

export default App