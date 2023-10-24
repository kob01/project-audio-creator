import React from 'react'

import GlobalSetting from './View.Dialog.GlobalSetting'
import AudioMultipleSetting from './View.Dialog.AudioMultipleSetting'
import AudioSingleSetting from './View.Dialog.AudioSingleSetting'

import Imitation from './utils.imitation'

function App() {
  return <><GlobalSetting /><AudioMultipleSetting /><AudioSingleSetting /></>
}

export default Imitation.withBindRender(App)