import React from 'react'

import Slider from '@mui/material/Slider'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer, playAudioBuffer } from './utils.audio'

function ConsoleButton(props) {
  const { id, name, use, codeInclued, codeMain, codeExclude } = props.source

  const playTimeRef = React.useRef()

  const [playTime, setPlayTime] = React.useState(false)

  const [codePress, setCodePress] = React.useState([])

  const play = () => {
    playAudioBuffer(props.source)

    setPlayTime(true)

    clearTimeout(playTimeRef.current)

    playTimeRef.current = setTimeout(() => setPlayTime(false), 500)

    Imitation.setState(pre => { pre.times = pre.times + 1; return pre })
  }

  const onMouseDown = (e) => {
    if (use === false) return
    if (e.button !== 0) return

    play()
  }

  const onTouchStart = (e) => {
    if (use === false) return

    play()
  }

  const onContextMenu = (e) => {
    e.preventDefault()

    Imitation.setState(pre => { pre.dialogAudioSingleSetting = true; pre.audioSingleSetting = id; return pre })
  }

  const style = React.useMemo(() => {
    const active = playTime

    const r = {
      display: 'inline-block',
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: '0.5s all',
      width: 72,
      height: 72,
      margin: 8,
      borderRadius: 12,
      fontWeight: 'bold',
      position: 'relative',
      fontSize: 12,
      boxShadow: '0 4px 8px gray',
      transform: active ? `rotate(${Math.random() < 0.5 ? 45 : -45}deg)` : 'rotate(0)',
      opacity: use ? 1 : 0.35
    }

    if (name.includes('M') === true) Object.assign(r, { background: active ? 'white' : 'black', color: active ? 'black' : 'white' })
    if (name.includes('M') === false) Object.assign(r, { background: active ? 'black' : 'white', color: active ? 'white' : 'black' })

    return r
  }, [use, playTime])

  React.useEffect(() => {
    if (use === false) return
    if (Imitation.state.dialogGlobalSetting !== false || Imitation.state.dialogAudioMultipleSetting !== false || Imitation.state.dialogAudioSingleSetting !== false) return

    const keydown = (e) => {
      const result = codePress.includes(e.code) ? codePress : [...codePress, e.code]
      setCodePress(result)

      if (codeMain.includes(result[result.length - 1]) && codeInclued.every(i => result.includes(i)) && codeExclude.every(i => !result.includes(i))) play()
    }

    const keyup = (e) => {
      const result = codePress.filter(i => !i.includes(e.code))
      setCodePress(result)
    }


    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)

    return () => {
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
    }
  }, [props.source, codePress, Imitation.state.dialogGlobalSetting, Imitation.state.dialogAudioMultipleSetting, Imitation.state.dialogAudioSingleSetting])

  return <div style={style} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onContextMenu={onContextMenu}>{name}</div>
}

function App() {
  const [scale, setScale] = React.useState(1)

  const [audioSource, setAudioSource] = React.useState(Imitation.state.audio.filter(i => i._id === 'BassoonStacF1'))

  React.useEffect(async () => {
    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.filter(i => i._id === 'BassoonStacF1')))

    Imitation.state.audioMultipleSetting = 'BassoonStacF1'

    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    const process = {
      index: 0,

      done: false,

      next: () => {
        const current = audio[process.index]

        if (current !== undefined) Object.assign(current, Imitation.state.audioSetting.find(i_ => current.id === i_.id))

        if (current === undefined) process.done = true

        process.index = process.index + 1
      }
    }

    await requestIdleCallbackProcess(process)

    const source = await loadAudioBuffer(audio)

    setAudioSource(source)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }, [Imitation.state.audioSetting])

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.5s all' }}>

    <div style={{ width: 1500, height: 1000, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }}>
      {
        ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i, index) => {
          return <div key={index} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {
              audioSource.filter(i_ => i_.id.split('.')[1].includes(i)).map((i, index) => <ConsoleButton key={index} source={i} />)
            }
          </div>
        })
      }
    </div>

    <Slider style={{ position: 'absolute', bottom: 16, left: 0, right: 0, margin: 'auto', width: 600, maxWidth: 'calc(100% - 32px)' }} value={scale} onChange={(e, v) => { setScale(v) }} min={0} max={2} step={0.1} />

  </Animation>
}

export default App