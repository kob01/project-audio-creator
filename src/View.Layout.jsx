import React from 'react'
import { HashRouter } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import Message from './View.Global.Message'
import Loading from './View.Global.Loading'
import Canvas from './View.Global.Canvas'
import Drag from './View.Global.Drag'

import Dialog from './View.Dialog'
import Navigation from './View.Navigation'
import Page from './View.Page'
import PageConsole from './View.Page.Console'

import Imitation from './utils.imitation'

function App() {

  React.useEffect(() => {
    const event = () => {
      if (window.ontouchstart !== undefined) return
      if (window.innerWidth < 2000 || window.innerHeight < 1000) Imitation.assignState({ message: `suggest 'ctrl -' to zoom out screen` })
    }

    event()

    window.addEventListener('resize', event)

    return () => window.removeEventListener('resize', event)
  }, [])

  return <ThemeProvider theme={createTheme(Imitation.state.theme)}>
    <HashRouter>
      <Loading />
      <Message />
      <Canvas />
      <Drag />
      <Dialog />

      <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>

        <Navigation />

        <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 0, flexGrow: 1, position: 'relative' }}>
            <Page />
          </div>
          <div style={{ height: 'fit-content' }}>
            <PageConsole />
          </div>
        </div>

      </div>

    </HashRouter>
  </ThemeProvider>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state.theme)])