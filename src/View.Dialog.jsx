import React from 'react'

import GlobalSetting from './View.Dialog.GlobalSetting'
import ConsoleRename from './View.Dialog.ConsoleRename'
import AudioSetting from './View.Dialog.AudioSetting'
import ConsoleAudioSetting from './View.Dialog.ConsoleAudioSetting'
import ConsoleTimeAlignment from './View.Dialog.ConsoleTimeAlignment'

function App() {
  return <>
    <ConsoleRename />
    <GlobalSetting />
    <AudioSetting />
    <ConsoleAudioSetting />
    <ConsoleTimeAlignment />
  </>
}

export default App