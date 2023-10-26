import React from 'react'
import { HashRouter } from 'react-router-dom'

import Message from './View.Global.Message'
import Loading from './View.Global.Loading'
import Wave from './View.Global.Wave'

import Dialog from './View.Dialog'
import Navigation from './View.Navigation'
import Page from './View.Page'

import Imitation from './utils.imitation'

function App() {

  React.useEffect(() => {
    const event = () => {
      if (window.innerWidth < 2000 || window.innerHeight < 1000) Imitation.assignState({ message: `suggest 'ctrl -' to zoom out screen` })
    }

    event()

    window.addEventListener('resize', event)

    return () => window.removeEventListener('resize', event)
  }, [])

  return <>
    <HashRouter>
      <Loading />
      <Message />
      <Wave />

      <Dialog />

      <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
        <Navigation />
        <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 0, flexGrow: 1, position: 'relative' }}>
            <Page />
          </div>
          <div style={{ height: 0 }}>

          </div>

        </div>
      </div>

    </HashRouter>
  </>
}

export default Imitation.withBindRender(App)