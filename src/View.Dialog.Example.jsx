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

import example from '../src-example/index'

function App() {
  const [console, setConsole] = React.useState()
  const [consoles] = React.useState(example.filter(i => i.type === 'console').map(i => i.label))
  const [setting, setSetting] = React.useState()
  const [settings] = React.useState(example.filter(i => i.type === 'setting').map(i => i.label))

  const save = async () => {
    if (console) {
      Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

      const r = await example.find(i => i.type === 'console' && i.label === console).value()

      Imitation.setState(pre => { pre.loading = pre.loading - 1; pre.console = JSON.parse(JSON.stringify(r)); pre.message = 'Load'; return pre })
    }

    if (setting) {
      Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

      const r = await example.find(i => i.type === 'setting' && i.label === setting).value()

      Imitation.setState(pre => { pre.loading = pre.loading - 1; pre.audioSetting = JSON.parse(JSON.stringify(r)); pre.message = 'Load'; return pre })
    }

    Imitation.assignState({ dialogExample: null })
  }

  const onClose = () => {
    Imitation.assignState({ dialogExample: null })
  }

  React.useEffect(() => {
    if (Imitation.state.dialogExample !== null) {
      setConsole()
      setSetting()
    }
  }, [Imitation.state.dialogExample])

  return <Dialog open={Imitation.state.dialogExample !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => onClose()}>
    <DialogTitle style={{ fontSize: 16 }}>Example</DialogTitle>
    <DialogContent dividers style={{ fontSize: 14 }}>
      <Grid container spacing={1}>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <Autocomplete {...AutocompleteSX} fullWidth value={console} onChange={(e, v) => setConsole(v)} options={consoles} renderInput={(params) => <TextField {...params} label='Console' />} />
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <Autocomplete {...AutocompleteSX} fullWidth value={console} onChange={(e, v) => setSetting(v)} options={settings} renderInput={(params) => <TextField {...params} label='Setting' />} />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => save()}>Save</Button>
    </DialogActions>
  </Dialog >
}

export default Imitation.withBindRender(App, state => [state.dialogExample])