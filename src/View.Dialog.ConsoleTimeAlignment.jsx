import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'

import SaveIcon from '@mui/icons-material/Save'

import Imitation from './utils.imitation'

function App() {
  const [value, setValue] = React.useState(1)

  const close = () => {
    Imitation.assignState({ dialogConsoleTimeAlignment: null })
  }

  const save = () => {
    Imitation.state.dialogConsoleTimeAlignment.onChange(value)
  }

  if (Imitation.state.dialogConsoleTimeAlignment === null) return null

  return <Dialog open={Imitation.state.dialogConsoleTimeAlignment !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => close()}>
    <DialogTitle style={{ fontSize: 16 }}>Time Alignment</DialogTitle>
    <DialogContent dividers style={{ fontSize: 14 }}>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          Time Alignment<span style={{ outline: 'none', marginLeft: 8 }} contentEditable='true' onBlur={e => isNaN(e.target.innerText) ? e.target.innerText = value : setValue(Number(e.target.innerText))}>{value}</span>
        </Grid>
        <Grid item xs={12}>
          <Slider value={value} onChange={(e, v) => { setValue(v) }} min={0} max={value + 1} step={0.1} />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { save(); close(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default Imitation.withBindRender(App, state => [state.dialogConsoleTimeAlignment])