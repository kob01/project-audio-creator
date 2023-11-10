import React from 'react'

import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer, playAudioContext } from './utils.audio'

function ConsoleButton(props) {
  const { id, name, use, codeInclued, codeMain, codeExclude } = props.source

  const playTimeRef = React.useRef()

  const mouseTimeRef = React.useRef()

  const mouseDownRef = React.useRef()

  const [playTime, setPlayTime] = React.useState(false)

  const [codePress, setCodePress] = React.useState([])

  const play = () => {
    playAudioContext(props.source)

    setPlayTime(true)

    clearTimeout(playTimeRef.current)

    playTimeRef.current = setTimeout(() => setPlayTime(false), 500)

    Imitation.setState(pre => { pre.canvasAnimation = pre.canvasAnimation + 1; return pre })
  }

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

  const onMouseDown = (e) => {
    if (e.button !== 0) return

    if (use === true) play()

    mouseDownRef.current = true

    mouseTimeRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogAudioSetting = props.source; return pre }), 500);
  }

  const onMouseMove = (e) => {
    if (mouseDownRef.current === true && Imitation.state.dragTarget === null) Imitation.assignState({ dragTarget: props.source })

    clearInterval(mouseTimeRef.current)
  }

  const onMouseUp = (e) => {
    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null) Imitation.assignState({ dragTarget: null })

    mouseDownRef.current = undefined

    clearInterval(mouseTimeRef.current)
  }

  const onTouchStart = (e) => {
    if (use === true) play()

    mouseDownRef.current = true

    mouseTimeRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogAudioSetting = props.source; return pre }), 500);
  }

  const onTouchMove = (e) => {
    if (mouseDownRef.current === true && Imitation.state.dragTarget === null) Imitation.assignState({ dragTarget: props.source })

    clearInterval(mouseTimeRef.current)
  }

  const onTouchEnd = (e) => {
    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null) Imitation.assignState({ dragTarget: null })

    mouseDownRef.current = undefined

    clearInterval(mouseTimeRef.current)
  }

  const onContextMenu = (e) => {
    e.preventDefault()

    Imitation.setState(pre => { pre.dialogAudioSetting = props.source; return pre })
  }

  const event = {
    onMouseDown: window.ontouchstart === undefined ? onMouseDown : undefined,
    onTouchStart: window.ontouchstart !== undefined ? onTouchStart : undefined,
    onContextMenu: onContextMenu,
  }

  const variant = React.useMemo(() => {
    if (id.includes('M') === true && playTime === true) return 'contained'
    if (id.includes('M') === true && playTime === false) return 'contained'
    if (id.includes('M') === false && playTime === true) return 'outlined'
    if (id.includes('M') === false && playTime === false) return 'outlined'
  }, [playTime])

  const style = React.useMemo(() => {
    const r = {
      width: 72,
      height: 72,
      margin: 8,
      borderRadius: 12,
      fontSize: 12,
      boxShadow: `0 4px 8px gray`,
      border: 'none',
      transform: playTime ? `rotate(${Math.random() < 0.5 ? 45 : -45}deg)` : 'rotate(0)',
      background: variant === 'outlined' ? '#ffffff' : undefined,
      opacity: use ? 1 : 0.35,
      cursor: use ? 'pointer' : 'default',
      transition: '0.5s all',
    }
    return r
  }, [use, playTime, variant, Imitation.state.theme.palette.primary.main])

  React.useEffect(() => {
    if (window.ontouchstart === undefined) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
    }

    if (window.ontouchstart !== undefined) {
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onTouchEnd)

      return () => {
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
      }
    }
  }, [])

  React.useEffect(() => {
    if (use === false) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleRename !== null || Imitation.state.dialogTimeAlignment !== null || Imitation.state.dialogAudioSetting !== null || Imitation.state.dialogConsoleAudioSetting !== null) return

    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)

    return () => {
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
    }
  }, [props.source, codePress, Imitation.state.dialogGlobalSetting, Imitation.state.dialogExample, Imitation.state.dialogLocalStorage, Imitation.state.dialogConsoleRename, Imitation.state.dialogTimeAlignment, Imitation.state.dialogAudioSetting, Imitation.state.dialogConsoleAudioSetting])

  return <Button variant={variant} style={style} {...event}>{name}</Button>
}

function App() {
  const containerRef = React.useRef()
  const contentRef = React.useRef()
  const timeoutRef = React.useRef()

  const [scale, setScale] = React.useState(1)
  const [consoleFullScreen, setConsoleFullScreen] = React.useState(Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true)
  const [audioSource, setAudioSource] = React.useState(Imitation.state.audio.filter(i => i._id === 'SimplePiano'))

  React.useEffect(() => {
    const r = Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true

    setConsoleFullScreen(r)
  }, [Imitation.state.consoleFullScreen, Imitation.state.consoleExpand])

  React.useEffect(() => {
    if (consoleFullScreen) return null

    const observer = new ResizeObserver(() => {
      const event = () => {
        const widthRate = (containerRef.current.offsetWidth - 32) / contentRef.current.offsetWidth
        const heightRate = (containerRef.current.offsetHeight - 135) / contentRef.current.offsetHeight

        const rate = Math.min(widthRate, heightRate, 1)

        setScale(rate)
      }

      clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(event, 500)
    })

    observer.observe(containerRef.current)

    return () => { clearTimeout(timeoutRef.current); observer.disconnect() }
  }, [consoleFullScreen])

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

    const audioBuffer = await loadAudioBuffer(audio)

    setAudioSource(audioBuffer)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }, [Imitation.state.audioSetting])

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: consoleFullScreen ? 0 : 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.5s all' }} ref_={el => containerRef.current = el}>

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

export default Imitation.withBindRender(App, state => [state.dialogGlobalSetting, state.dialogExample, state.dialogLocalStorage, state.dialogConsoleRename, state.dialogTimeAlignment, state.dialogAudioSetting, state.dialogConsoleAudioSetting, state.consoleExpand, state.consoleFullScreen, JSON.stringify(state.dragTarget), JSON.stringify(state.consoleCurrent), JSON.stringify(state.audio), JSON.stringify(state.audioSetting), JSON.stringify(state.globalSetting), JSON.stringify(state.theme)])