import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'

import SaveIcon from '@mui/icons-material/Save'

import Imitation from './utils.imitation'
import { TextFieldSX } from './utils.mui.sx'

function App() {
  const [value, setValue] = React.useState({ globalSetting: Imitation.state.globalSetting, theme: Imitation.state.theme })

  const onClose = () => Imitation.assignState({ dialogGlobalSetting: null })

  return <Dialog open={Imitation.state.dialogGlobalSetting !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          Volume {value.globalSetting.volume}
        </Grid>
        <Grid item xs={12}>
          <Slider value={value.globalSetting.volume} onChange={(e, v) => { value.globalSetting.volume = v; setValue({ ...value }) }} min={0} max={2} step={0.1} />
        </Grid>

        <Grid item xs={12}>
          Scale {value.globalSetting.scale}
        </Grid>
        <Grid item xs={12}>
          <Slider value={value.globalSetting.scale} onChange={(e, v) => { value.globalSetting.scale = v; setValue({ ...value }) }} min={0} max={2} step={0.1} />
        </Grid>

        <Grid item xs={12}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Theme Color' value={value.theme.palette.primary.main} onChange={(e, v) => { value.theme.palette.primary.main = e.target.value; setValue({ ...value }) }} type='color' />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { Imitation.assignState({ globalSetting: value.globalSetting, theme: value.theme }); onClose(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default Imitation.withBindRender(App, state => [state.dialogGlobalSetting, JSON.stringify(state.globalSetting), JSON.stringify(state.theme)])