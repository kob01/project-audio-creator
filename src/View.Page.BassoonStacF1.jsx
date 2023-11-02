import React from 'react'

import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'

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

    Imitation.setState(pre => { pre.canvasAnimation = pre.canvasAnimation + 1; return pre })
  }

  const onMouseDown = (e) => {
    if (e.button !== 0) return

    if (use === true) play()

    mouseTimeRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogAudioSetting = { id }; return pre }), 500);
  }

  const onMouseMove = (e) => {
    clearInterval(mouseTimeRef.current)
  }

  const onMouseUp = (e) => {
    clearInterval(mouseTimeRef.current)
  }

  const onTouchStart = (e) => {
    if (use === true) play()

    mouseTimeRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogAudioSetting = { id }; return pre }), 500);
  }

  const onTouchMove = (e) => {
    clearInterval(mouseTimeRef.current)
  }

  const onTouchEnd = (e) => {
    clearInterval(mouseTimeRef.current)
  }

  const onContextMenu = (e) => {
    e.preventDefault()

    Imitation.setState(pre => { pre.dialogAudioSetting = { id }; return pre })
  }

  const onDragStart = (e) => {
    Imitation.assignState({ dragTarget: props.source })
  }

  const onDragEnd = (e) => {
    Imitation.assignState({ dragTarget: null })
  }

  const event = {
    onMouseDown: window.ontouchstart === undefined ? onMouseDown : undefined,
    onMouseUp: window.ontouchstart === undefined ? onMouseUp : undefined,
    onMouseMove: window.ontouchstart === undefined ? onMouseMove : undefined,
    onTouchStart: window.ontouchstart !== undefined ? onTouchStart : undefined,
    onTouchEnd: window.ontouchstart !== undefined ? onTouchEnd : undefined,
    onTouchMove: window.ontouchstart !== undefined ? onTouchMove : undefined,
    onContextMenu: onContextMenu,
    onDragStart: Imitation.state.consoleCurrent !== null ? onDragStart : undefined,
    onDragEnd: Imitation.state.consoleCurrent !== null ? onDragEnd : undefined,
    draggable: Imitation.state.consoleCurrent !== null ? true : false,
  }

  const style = React.useMemo(() => {
    const r = {
      width: 72,
      height: 72,
      margin: 8,
      borderRadius: 12,
      fontSize: 12,
      boxShadow: `0 4px 8px gray`,
      transform: playTime ? `rotate(${Math.random() < 0.5 ? 45 : -45}deg)` : 'rotate(0)',
      opacity: use ? 1 : 0.35,
      cursor: use ? 'pointer' : 'default',
      transition: '0.5s all',
    }

    if (name.includes('M') === true && playTime === true) Object.assign(r, { background: 'white', color: Imitation.state.theme.palette.primary.main })
    if (name.includes('M') === true && playTime === false) Object.assign(r, { background: Imitation.state.theme.palette.primary.main, color: 'white' })
    if (name.includes('M') === false && playTime === true) Object.assign(r, { background: Imitation.state.theme.palette.primary.main, color: 'white' })
    if (name.includes('M') === false && playTime === false) Object.assign(r, { background: 'white', color: Imitation.state.theme.palette.primary.main })

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

  return <Button variant='contained' style={style} {...event}>{name}</Button>
}

function App() {
  const containerRef = React.useRef()
  const contentRef = React.useRef()

  const [scale, setScale] = React.useState(1)

  const [audioSource, setAudioSource] = React.useState(Imitation.state.audio.filter(i => i._id === 'BassoonStacF1'))

  React.useEffect(async () => {
    const audio = JSON.parse(JSON.stringify(Imitation.state.audio.filter(i => i._id === 'BassoonStacF1')))

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
      const widthRate = (containerRef.current.offsetWidth - 32) / contentRef.current.offsetWidth
      const heightRate = (containerRef.current.offsetHeight - 135) / contentRef.current.offsetHeight

      const rate = Math.min(widthRate, heightRate, 1)

      setScale(rate)
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.5s all' }} ref_={el => containerRef.current = el}>

    <div style={{ height: 'fit-content', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }} ref={el => contentRef.current = el}>
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

    <Slider style={{ position: 'absolute', zIndex: 2, bottom: 16, width: 600, maxWidth: 'calc(100% - 32px)' }} value={scale} onChange={(e, v) => { setScale(v) }} min={0} max={2} step={0.1} />

  </Animation>
}

export default App