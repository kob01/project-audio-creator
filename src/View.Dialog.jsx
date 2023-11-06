import React from 'react'

import GlobalSetting from './View.Dialog.GlobalSetting'
import ConsoleRename from './View.Dialog.ConsoleRename'
import AudioSetting from './View.Dialog.AudioSetting'
import ConsoleAudioSetting from './View.Dialog.ConsoleAudioSetting'

function App() {
  return <>
    <ConsoleRename />
    <GlobalSetting />
    <AudioSetting />
    <ConsoleAudioSetting />
  </>
}

export default App