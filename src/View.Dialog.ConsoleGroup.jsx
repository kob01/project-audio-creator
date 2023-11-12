import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'

import RestoreIcon from '@mui/icons-material/Restore'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'

import Imitation from './utils.imitation'

import { TextFieldSX } from './utils.mui.sx'

function App() {
  const [group, setGroup] = React.useState()

  const close = () => {
    Imitation.assignState({ dialogConsoleGroup: null })
  }

  const save = () => {
    const current = Imitation.state.console.find(i => i.hash === Imitation.state.dialogConsoleGroup.hash)

    current.name = group.name

    if (group.use !== undefined) {
      current.group.forEach(i => i.use = group.use)
    }

    if (group.volume !== undefined) {
      current.group.forEach(i => i.volume = group.volume)
    }

    Imitation.dispatch()
  }

  const remove = () => {
    Imitation.setState(pre => { pre.console = pre.console.filter(i => i.hash !== Imitation.state.dialogConsoleGroup.hash); pre.consoleCurrent = null; return pre })
  }

  const reset = () => {
    init()
  }

  const init = () => {
    const current = Imitation.state.console.find(i => i.hash === Imitation.state.dialogConsoleGroup.hash)

    const name = current.name
    const use = current.group.some(i => i.use === true)
    const volume = current.group.reduce((t, i) => t + i.volume, 0) / current.group.length

    setGroup({ name, use, volume })
  }

  React.useEffect(() => {
    if (Imitation.state.dialogConsoleGroup !== null) {
      init()
    }
  }, [Imitation.state.dialogConsoleGroup])

  if (group === undefined) return null

  return <Dialog open={Imitation.state.dialogConsoleGroup !== null} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={() => close()}>
    <DialogTitle style={{ fontSize: 16 }}>Setting</DialogTitle>
    <DialogContent dividers style={{ fontSize: 14 }}>
      <Grid container spacing={1}>

        <Grid item xs={12} style={{ marginBottom: 8 }}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Name' value={group.name} onChange={e => setGroup({ ...group, name: e.target.value })} />
        </Grid>

        <Grid item xs={12}>
          Volume<span style={{ outline: 'none', marginLeft: 8 }} contentEditable='true' onBlur={e => isNaN(e.target.innerText) ? e.target.innerText = group.volume : setGroup({ ...group, volume: Number(e.target.innerText) })}>{group.volume}</span>
        </Grid>
        <Grid item xs={12}>
          <Slider value={group.volume} onChange={(e, v) => { setGroup({ ...group, volume: v }) }} min={0} max={2} step={0.1} />
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: '0 8px' }} variant='contained' color={group.use ? 'primary' : 'inherit'} onClick={(e) => { setGroup({ ...group, use: !group.use }) }}><SendIcon style={{ marginRight: 4 }} />Use</Button>
          <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => reset()}><RestoreIcon style={{ marginRight: 4 }} />Reset</Button>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={() => { remove(); close(); }} color='error'><DeleteIcon style={{ marginRight: 4 }} />Delete</Button>
      <Button variant='contained' onClick={() => { save(); close(); }}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
    </DialogActions>
  </Dialog>
}

export default Imitation.withBindRender(App, state => [state.dialogConsoleGroup, JSON.stringify(state.console), JSON.stringify(state.audio)])