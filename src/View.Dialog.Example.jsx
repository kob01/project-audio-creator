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
import { AutocompleteSX, TextFieldSX } from './utils.mui.sx'

import example from '../src-example/index'

function App() {
  const [consoleFilter, setConsoleFilter] = React.useState('')
  const [console, setConsole] = React.useState()
  const [consoles] = React.useState(example.filter(i => i.type === 'console').map(i => i.label))
  const [settingFilter, setSettingFilter] = React.useState('')
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

  const close = () => {
    Imitation.assignState({ dialogExample: null })
  }

  React.useEffect(() => {
    if (Imitation.state.dialogExample !== null) {
      setConsole()
      setSetting()
    }
  }, [Imitation.state.dialogExample])

  return <Dialog open={Imitation.state.dialogExample !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => close()}>
    <DialogTitle style={{ fontSize: 16 }}>Example</DialogTitle>
    <DialogContent dividers style={{ fontSize: 14 }}>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Console' value={consoleFilter} onChange={e => setConsoleFilter(e.target.value)} />
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', overflowX: 'auto' }}>
          {
            consoles.filter(i => i.includes(consoleFilter)).map(i => {
              return <Button key={i} style={{ margin: '0 4px', flexShrink: 0 }} variant={console === i ? 'contained' : 'outlined'} onClick={() => setConsole(console === i ? undefined : i)}>{i}</Button>
            })
          }
        </Grid>

        <Grid item xs={12}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Setting' value={settingFilter} onChange={e => setSettingFilter(e.target.value)} />
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', overflowX: 'auto' }}>
          {
            settings.filter(i => i.includes(settingFilter)).map(i => {
              return <Button key={i} style={{ margin: '0 4px', flexShrink: 0 }} variant={setting === i ? 'contained' : 'outlined'} onClick={() => setSettingFilter(setting === i ? undefined : i)}>{i}</Button>
            })
          }
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => save()}>Save</Button>
    </DialogActions>
  </Dialog >
}

export default Imitation.withBindRender(App, state => [state.dialogExample])