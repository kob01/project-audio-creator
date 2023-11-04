import React from 'react'

import GlobalSetting from './View.Dialog.GlobalSetting'
import AudioSetting from './View.Dialog.AudioSetting'
import ConsoleAudioSetting from './View.Dialog.ConsoleAudioSetting'

import Imitation from './utils.imitation'

function App() {
  return <>
    <GlobalSetting />
    <AudioSetting />
    <ConsoleAudioSetting />
  </>
}

export default Imitation.withBindRender(App, state => [state.dialogGlobalSetting, state.dialogAudioSetting, state.dialogConsoleAudioSetting])