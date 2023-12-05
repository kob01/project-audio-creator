import React from 'react'

import Button from '@mui/material/Button'

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

function App() {
  const [recording, setRecording] = React.useState(false)

  const animation = React.useMemo(() => {
    if (recording === true) {
      return { animationName: 'jump', animationIterationCount: 'infinite', animationDuration: '2s', animationFillMode: 'forwards' }
    }

    if (recording === false) {
      return undefined
    }

  }, [recording])

  return <div style={{ width: '100%', height: '100%', position: 'absolute', transition: '0.5s all' }}>

    <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true ? 0 : 1 }]} style={{ width: 'fit-content', height: 'fit-content', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transition: '0.5s all' }}>

      <Button style={{ width: 'fit-content', height: 'fit-content', padding: 8, marginBottom: 8, borderRadius: '50%', ...animation }} onClick={() => setRecording(pre => !pre)}><FiberManualRecordIcon style={{ fontSize: 120, fill: recording ? '#d32f2f' : '#000000', transition: '0.5s all' }} /></Button>

      {
        recording === false ? <Button onClick={() => setRecording(true)}>Record</Button> : null
      }
      {
        recording === true ? <Button onClick={() => setRecording(false)}>Stop</Button> : null
      }

    </Animation>

  </div>
}

export default Imitation.withBindRender(App, state => [state.consoleFullScreen, state.consoleExpand])