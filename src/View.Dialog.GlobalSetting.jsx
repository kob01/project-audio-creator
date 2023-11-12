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
import ImageIcon from '@mui/icons-material/Image'

import Imitation from './utils.imitation'
import { TextFieldSX } from './utils.mui.sx'

function App() {
  const [value, setValue] = React.useState()

  const close = () => {
    Imitation.assignState({ dialogGlobalSetting: null })
  }

  React.useEffect(() => {
    var r = { globalSetting: Imitation.state.globalSetting, theme: Imitation.state.theme, useCanvasAnimation: Imitation.state.useCanvasAnimation }

    r = JSON.parse(JSON.stringify(r))

    setValue(r)
  }, [Imitation.state.globalSetting, Imitation.state.theme, Imitation.state.useCanvasAnimation])

  if (value === undefined) return null

  return <Dialog open={Imitation.state.dialogGlobalSetting !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => close()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers style={{ fontSize: 14 }}>
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

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: '0 8px' }} variant='contained' color={value.useCanvasAnimation ? 'primary' : 'inherit'} onClick={(e) => { value.useCanvasAnimation = !value.useCanvasAnimation; setValue({ ...value }) }}><ImageIcon style={{ marginRight: 4 }} />Canvas Animation</Button>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { Imitation.assignState({ globalSetting: value.globalSetting, theme: value.theme, useCanvasAnimation: value.useCanvasAnimation }); close(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default Imitation.withBindRender(App, state => [state.dialogGlobalSetting, state.useCanvasAnimation, JSON.stringify(state.globalSetting), JSON.stringify(state.theme)])