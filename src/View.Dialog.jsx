import React from 'react'

import GlobalSetting from './View.Dialog.GlobalSetting'
import AudioSetting from './View.Dialog.AudioSetting'

import Imitation from './utils.imitation'

function App() {
  return <>
    <GlobalSetting />
    <AudioSetting />
  </>
}

export default Imitation.withBindRender(App)