import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'

import Imitation from './utils.imitation'

function App() {
  const [value, setValue] = React.useState(Imitation.state.setting)

  const onClose = () => Imitation.assignState({ dialogGlobalSetting: false })

  return <Dialog open={Imitation.state.dialogGlobalSetting} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          Volume {value.volume}
        </Grid>
        <Grid item xs={12}>
          <Slider value={value.volume} onChange={(e, v) => { setValue({ ...value, volume: v }) }} min={0} max={2} step={0.1} />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { Imitation.assignState({ setting: value }); onClose(); }}>Save</Button>
    </DialogActions>
  </Dialog>
}

export default App