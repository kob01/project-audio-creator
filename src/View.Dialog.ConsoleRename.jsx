import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import SaveIcon from '@mui/icons-material/Save'

import Imitation from './utils.imitation'
import { TextFieldSX } from './utils.mui.sx'

function App() {
  const [value, setValue] = React.useState()

  const onClose = () => {
    Imitation.assignState({ dialogConsoleRename: null })
  }

  const onSave = () => {
    const console = Imitation.state.console.find(i => i.hash === Imitation.state.dialogConsoleRename.hash)

    Object.assign(console, value)

    Imitation.dispatch()
  }

  React.useEffect(() => {
    if (Imitation.state.dialogConsoleRename !== null) {
      const console = Imitation.state.console.find(i => i.hash === Imitation.state.dialogConsoleRename.hash)

      setValue(console)
    }
  }, [Imitation.state.dialogConsoleRename])

  if (value === undefined) return null

  return <Dialog open={Imitation.state.dialogConsoleRename !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Rename</DialogTitle>
    <DialogContent dividers style={{ fontSize: 14 }}>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Rename' value={value.name} onChange={(e, v) => { setValue({ ...value, name: e.target.value }) }} />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { onSave(); onClose(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default Imitation.withBindRender(App, state => [state.dialogConsoleRename])