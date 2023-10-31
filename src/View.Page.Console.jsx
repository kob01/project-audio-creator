import React from 'react'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import Imitation from './utils.imitation'

import Animation from './View.Component.Animation'

function App() {

  const height = 400

  const expand = () => Imitation.setState(pre => { pre.consoleExpand = !pre.consoleExpand; return pre })

  return <div style={{ position: 'relative', height: Imitation.state.consoleExpand ? height : 68.5, transition: '0.5s all', overflow: 'hidden' }}>

    <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ position: 'absolute', left: 0, right: 0, bottom: 16, margin: 'auto', width: 'fit-content', transition: '0.5s all' }} variant='contained' onClick={() => expand()}>Expand Console</Animation>

    {
      Imitation.state.consoleExpand === true ?
        <Animation tag={'div'} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ position: 'absolute', left: 0, right: 0, bottom: 68.5, margin: 'auto', width: 'fit-content', height: height - 84.5, width: 'calc(100% - 32px)', boxShadow: '0 4px 8px gray', borderRadius: 12, transition: '0.5s all' }} elevation={3}>
        </Animation>
        : null
    }

  </div >
}

export default App