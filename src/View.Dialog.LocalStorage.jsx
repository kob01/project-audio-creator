import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import Imitation from './utils.imitation'
import { AutocompleteSX } from './utils.mui.sx'

function App() {
  const [ifLocalStorage, setIfLocalStorage] = React.useState()

  const onClose = () => {
    Imitation.assignState({ dialogLocalStorage: null })
  }

  const save = () => {
    localStorage.setItem('audioSetting', JSON.stringify(Imitation.state.audioSetting))
    localStorage.setItem('console', JSON.stringify(Imitation.state.console))

    Imitation.state.message = 'Save'

    Imitation.dispatch()

    // const blob = new Blob([data], { type: 'application/json' })
    // const url = URL.createObjectURL(blob)

    // const link = document.createElement('a')
    // link.href = url
    // link.download = 'library.json'
    // link.click()

    // URL.revokeObjectURL(url)
  }

  const load = () => {
    if (localStorage.getItem('audioSetting')) Imitation.state.audioSetting = JSON.parse(localStorage.getItem('audioSetting'))
    if (localStorage.getItem('console')) Imitation.state.console = JSON.parse(localStorage.getItem('console'))
    Imitation.state.consoleCurrent = null
    Imitation.state.message = 'Load'

    Imitation.dispatch()

    // const file = e.target.files[0]

    // const reader = new FileReader()

    // reader.onload = (e) => {
    //   const data = JSON.parse(e.target.result)

    //   Imitation.state.audioSetting = data.audioSetting
    //   Imitation.state.console = data.console
    //   Imitation.state.consoleExpand = true
    //   Imitation.state.navigationDrawerExpand = false
    //   Imitation.state.message = 'Loaded'

    //   Imitation.dispatch()
    // }

    // reader.readAsText(file)
  }

  React.useEffect(() => {
    if (Imitation.state.dialogLocalStorage !== null) {

    }
  }, [Imitation.state.dialogLocalStorage])

  return <Dialog open={Imitation.state.dialogLocalStorage !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>LocalStorage</DialogTitle>
    <DialogContent dividers style={{ fontSize: 14 }}>
      <Grid container spacing={1}>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <Button fullWidth variant='outlined' onClick={() => save()}>Save</Button>
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <Button fullWidth variant='outlined' onClick={() => load()}>Load</Button>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      {/* <Button variant='contained' onClick={() => save()}>Save</Button> */}
    </DialogActions>
  </Dialog >
}

export default Imitation.withBindRender(App, state => [state.dialogLocalStorage])