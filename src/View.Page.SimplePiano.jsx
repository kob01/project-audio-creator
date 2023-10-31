import React from 'react'

import Slider from '@mui/material/Slider'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer, playAudioBuffer } from './utils.audio'

function ConsoleButton(props) {
  const { id, name, use, codeInclued, codeMain, codeExclude } = props.source

  const playTimeRef = React.useRef()

  const mouseTimeRef = React.useRef()

  const [playTime, setPlayTime] = React.useState(false)

  const [codePress, setCodePress] = React.useState([])

  const play = () => {
    playAudioBuffer(props.source)

    setPlayTime(true)

    clearTimeout(playTimeRef.current)

    playTimeRef.current = setTimeout(() => setPlayTime(false), 500)

    Imitation.setState(pre => { pre.canvasTimes = pre.canvasTimes + 1; return pre })
  }

  const onMouseDown = (e) => {
    if (e.button !== 0) return

    if (use === true) play()

    mouseTimeRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogAudioSetting = { id }; return pre }), 500);
  }

  const onMouseUp = (e) => {
    clearInterval(mouseTimeRef.current)
  }

  const onTouchStart = (e) => {
    if (use === true) play()

    mouseTimeRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogAudioSetting = { id }; return pre }), 500);
  }

  const onTouchEnd = (e) => {
    clearInterval(mouseTimeRef.current)
  }

  const onContextMenu = (e) => {
    e.preventDefault()

    Imitation.setState(pre => { pre.dialogAudioSetting = { id }; return pre })
  }

  const event = {
    onMouseDown: window.ontouchstart === undefined ? onMouseDown : undefined,
    onMouseUp: window.ontouchstart === undefined ? onMouseUp : undefined,
    onTouchStart: window.ontouchstart !== undefined ? onTouchStart : undefined,
    onTouchEnd: window.ontouchstart !== undefined ? onTouchEnd : undefined,
    onContextMenu: onContextMenu
  }

  const style = React.useMemo(() => {
    const r = {
      display: 'inline-block',
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: '0.5s all',
      width: 72,
      height: 72,
      margin: 8,
      borderRadius: 12,
      fontWeight: 'bold',
      position: 'relative',
      fontSize: 12,
      boxShadow: `0 4px 8px gray`,
      transform: playTime ? `rotate(${Math.random() < 0.5 ? 45 : -45}deg)` : 'rotate(0)',
      opacity: use ? 1 : 0.35,
      cursor: use ? 'pointer' : 'default',
    }

    if (name.includes('M') === true) Object.assign(r, { background: playTime ? 'white' : Imitation.state.theme.palette.primary.main, color: playTime ? Imitation.state.theme.palette.primary.main : 'white' })
    if (name.includes('M') === false) Object.assign(r, { background: playTime ? Imitation.state.theme.palette.primary.main : 'white', color: playTime ? 'white' : Imitation.state.theme.palette.primary.main })

    return r
  }, [use, playTime, Imitation.state.theme.palette.primary.main])

  React.useEffect(() => {
    if (use === false) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogAudioSetting !== null) return

    const keydown = (e) => {
      if (codePress.includes(e.code)) return

      const result = [...codePress, e.code]

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
  }, [props.source, codePress, Imitation.state.dialogGlobalSetting, Imitation.state.dialogAudioSetting])

  return <div style={style} {...event}>{name}</div>
}

function App() {
  const containerRef = React.useRef()

  const [scale, setScale] = React.useState(1)

  const [audioSource, setAudioSource] = React.useState(Imitation.state.audio.filter(i => i._id === 'SimplePiano'))

  React.useEffect(async () => {
    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.filter(i => i._id === 'SimplePiano')))

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

  React.useEffect(() => {
    const observer = new ResizeObserver(() => {
      const containerRect = containerRef.current.getBoundingClientRect()

      const widthRate = containerRect.width / 1200
      const heightRate = containerRect.height / 1000

      const rate = Math.min(widthRate, heightRate, 1)

      setScale(rate)
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.5s all' }} ref_={el => containerRef.current = el}>

    <div style={{ width: 1200, height: 1000, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }}>
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

    <Slider style={{ position: 'absolute', zIndex: 2, bottom: 16, left: 0, right: 0, margin: 'auto', width: 600, maxWidth: 'calc(100% - 32px)' }} value={scale} onChange={(e, v) => { setScale(v) }} min={0} max={2} step={0.1} />

  </Animation>
}

export default App