import React from 'react'

import GlobalSetting from './View.Dialog.GlobalSetting'
import AudioSetting from './View.Dialog.AudioSetting'
import ConsoleAudioSetting from './View.Dialog.ConsoleAudioSetting'

function App() {
  return <>
    <GlobalSetting />
    <AudioSetting />
    <ConsoleAudioSetting />
  </>
}

export default App