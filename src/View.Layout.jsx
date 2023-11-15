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
import { resizePage } from './utils.common'

function App() {

  React.useEffect(() => {
    const resize = () => {
      resizePage()
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <ThemeProvider theme={createTheme(Imitation.state.theme)}>
    <HashRouter>
      <Loading />
      <Message />
      <Canvas />
      <Drag />
      <Dialog />

      <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        <Navigation />

        <div style={{ height: 0, flexGrow: 1, position: 'relative' }}><Page /></div>

        <div style={{ height: 'fit-content' }}><PageConsole /></div>

      </div>

    </HashRouter>
  </ThemeProvider>
}

export default Imitation.withBindRender(App, state => [JSON.stringify(state.theme)])