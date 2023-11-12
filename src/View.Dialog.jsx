import React from 'react'

import GlobalSetting from './View.Dialog.GlobalSetting'
import PlaygroundAudio from './View.Dialog.PlaygroundAudio'
import ConsoleAudio from './View.Dialog.ConsoleAudio'
import ConsoleGroup from './View.Dialog.ConsoleGroup'
import ConsoleTimeAlignment from './View.Dialog.ConsoleTimeAlignment'
import Example from './View.Dialog.Example'
import LocalStorage from './View.Dialog.LocalStorage'

function App() {
  return <>
    <GlobalSetting />
    <PlaygroundAudio />
    <ConsoleAudio />
    <ConsoleGroup />
    <ConsoleTimeAlignment />
    <Example />
    <LocalStorage />
  </>
}

export default App