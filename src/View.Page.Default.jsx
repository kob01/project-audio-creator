import React from 'react'

import Button from '@mui/material/Button'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

function App() {

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true ? 0 : 1 }]} style={{ width: '100%', height: '100%', padding: 8, position: 'absolute', display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center', transition: '0.5s all' }}>

    <Button style={{ margin: 8, justifyContent: 'start', width: 'fit-content' }} fullWidth variant='outlined' onClick={() => Imitation.assignState({ navigationDrawerExpand: true })}>choose one musical instrument to start</Button>

  </Animation>
}

export default Imitation.withBindRender(App, state => [state.consoleFullScreen, state.consoleExpand])