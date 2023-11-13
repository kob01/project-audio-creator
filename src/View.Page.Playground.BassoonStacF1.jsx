import React from 'react'

import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'

import SettingsIcon from '@mui/icons-material/Settings'
import SaveIcon from '@mui/icons-material/Save'

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
    if (props.setting == true) return

    if (use === false) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (codePress.includes(e.code)) return

    const result = [...codePress, e.code]

    setCodePress(result)

    if (codeMain.includes(result[result.length - 1]) && codeInclued.every(i => result.includes(i)) && codeExclude.every(i => !result.includes(i))) play()
  }

  const keyup = (e) => {
    if (props.setting == true) return

    if (use === false) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    const result = codePress.filter(i => !i.includes(e.code))

    setCodePress(result)
  }

  const onMouseDown = (e) => {
    console.log(props.setting)
    if (props.setting == true) return

    if (e.button !== 0) return

    if (use === true) play()

    mouseDownRef.current = true

    mouseTimeRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogPlaygroundAudio = props.source; return pre }), 500);
  }

  const onMouseMove = (e) => {
    if (props.setting == true) return

    if (mouseDownRef.current === true && Imitation.state.dragTarget === null) Imitation.assignState({ dragTarget: props.source })

    clearInterval(mouseTimeRef.current)
  }

  const onMouseUp = (e) => {
    if (props.setting == true) return

    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null) Imitation.assignState({ dragTarget: null })

    mouseDownRef.current = undefined

    clearInterval(mouseTimeRef.current)
  }

  const onTouchStart = (e) => {
    if (props.setting == true) return

    if (use === true) play()

    mouseDownRef.current = true

    mouseTimeRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogPlaygroundAudio = props.source; return pre }), 500);
  }

  const onTouchMove = (e) => {
    if (props.setting == true) return

    if (mouseDownRef.current === true && Imitation.state.dragTarget === null) Imitation.assignState({ dragTarget: props.source })

    clearInterval(mouseTimeRef.current)
  }

  const onTouchEnd = (e) => {
    if (props.setting == true) return

    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null) Imitation.assignState({ dragTarget: null })

    mouseDownRef.current = undefined

    clearInterval(mouseTimeRef.current)
  }

  const onContextMenu = (e) => {
    if (props.setting == true) return

    e.preventDefault()

    Imitation.setState(pre => { pre.dialogPlaygroundAudio = props.source; return pre })
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
  }, [props.setting, props.source])

  React.useEffect(() => {
    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)

    return () => {
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
    }
  }, [props.setting, props.source, codePress, Imitation.state.dialogGlobalSetting, Imitation.state.dialogExample, Imitation.state.dialogLocalStorage, Imitation.state.dialogConsoleTimeAlignment, Imitation.state.dialogPlaygroundAudio, Imitation.state.dialogConsoleAudio, Imitation.state.dialogConsoleGroup])

  return <Button variant={variant} style={style} {...event}>{name}</Button>
}

function App() {
  const containerRef = React.useRef()
  const contentRef = React.useRef()
  const timeoutRef = React.useRef()

  const [setting, setSetting] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const [consoleFullScreen, setConsoleFullScreen] = React.useState(Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true)
  const [audioSource, setAudioSource] = React.useState(Imitation.state.audio.filter(i => i._id === 'BassoonStacF1'))

  React.useEffect(() => {
    const r = Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true

    setConsoleFullScreen(r)
  }, [Imitation.state.consoleFullScreen, Imitation.state.consoleExpand])

  React.useEffect(() => {
    if (consoleFullScreen) return null

    const observer = new ResizeObserver(() => {
      const event = () => {
        const widthRate = (containerRef.current.offsetWidth - 32) / contentRef.current.offsetWidth
        const heightRate = (containerRef.current.offsetHeight - 136) / contentRef.current.offsetHeight

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

    const audioBuffer = await loadAudioBuffer(audio)

    setAudioSource(audioBuffer)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }, [Imitation.state.audioSetting])

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: consoleFullScreen ? 0 : 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.5s all' }} ref={el => containerRef.current = el}>

    <div style={{ position: 'relative', zIndex: setting ? 1 : 3, height: 'fit-content', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: setting ? 0.2 : 1, transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }} ref={el => contentRef.current = el}>
      {
        ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i, index) => {
          return <div key={index} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {
              audioSource.filter(i_ => i_.id.split('.')[1].includes(i)).map((i, index) => <ConsoleButton key={index} source={i} setting={setting} />)
            }
          </div>
        })
      }
    </div>

    <Grid container spacing={1} style={{ position: 'absolute', zIndex: setting ? 3 : 1, width: 'calc(100% - 32px)', maxWidth: 600, height: 'fit-content', fontSize: 14, flexShrink: 0, opacity: setting ? 1 : 0, transition: '0.5s all' }}>
      <Grid item xs={12}>
        Scale<span style={{ outline: 'none', marginLeft: 8 }} contentEditable='true' onBlur={e => isNaN(e.target.innerText) ? e.target.innerText = scale : setScale(e.target.innerText)}>{scale}</span>
      </Grid>
      <Grid item xs={12}>
        <Slider value={scale} onChange={(e, v) => { setScale(v) }} min={0} max={2} step={0.1} />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => setSetting(false)}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
      </Grid>
    </Grid>

    <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', top: 0, left: 0 }}></div>

    <Button variant='text' style={{ position: 'absolute', zIndex: 4, bottom: 16 }} onClick={() => setSetting(pre => !pre)}><SettingsIcon /></Button>

  </Animation>
}

export default Imitation.withBindRender(App, state => [state.dialogGlobalSetting, state.dialogExample, state.dialogLocalStorage, state.dialogConsoleTimeAlignment, state.dialogPlaygroundAudio, state.dialogConsoleAudio, state.dialogConsoleGroup, state.consoleExpand, state.consoleFullScreen, JSON.stringify(state.dragTarget), JSON.stringify(state.consoleCurrent), JSON.stringify(state.audio), JSON.stringify(state.audioSetting), JSON.stringify(state.globalSetting), JSON.stringify(state.theme)])