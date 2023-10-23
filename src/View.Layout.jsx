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
  return <>
    <HashRouter>
      <Loading />
      <Message />
      <Wave />

      <Dialog/>

      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Navigation />
        <Page />
      </div>

    </HashRouter>
  </>
}

export default Imitation.withBindRender(App)