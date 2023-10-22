import React from 'react'
import { HashRouter } from 'react-router-dom'

import Message from './View.Global.Message'
import Loading from './View.Global.Loading'
import Wave from './View.Global.Wave'

import Navigation from './View.Navigation'
import Page from './View.Page.Content'

import Imitation from './utils.imitation'

function App() {
  return <>
    <HashRouter>
      <Loading />
      <Message />
      {/* <Wave /> */}

      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Navigation />
        <Page />
      </div>

    </HashRouter>
  </>
}

export default Imitation.withBindRender(App)