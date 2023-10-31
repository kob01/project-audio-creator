import React from 'react'

import Button from '@mui/material/Button'

import Imitation from './utils.imitation'

import Animation from './View.Component.Animation'

function App() {
  const expand = () => Imitation.setState(pre => { pre.consoleExpand = !pre.consoleExpand; return pre })

  return <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

    <div style={{ position: 'relative', margin: 'auto', width: 'calc(100% - 32px)', height: Imitation.state.consoleExpand ? 300 : 0, marginBottom: Imitation.state.consoleExpand ? 16 : 0, boxShadow: '0 4px 8px gray', borderRadius: 12, overflow: 'hidden', opacity: Imitation.state.consoleExpand ? 1 : 0, transition: '0.5s all' }}>
      <div style={{ position: 'absolute', width: '100%', height: 300, bottom: 0, left: 0, padding: 16, background: '#ffffff' }}>

      </div>
    </div>

    <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ width: 'fit-content', marginBottom: 16, transition: '0.5s all' }} variant='contained' onClick={() => expand()}>Expand Console</Animation>

  </div>
}

export default App