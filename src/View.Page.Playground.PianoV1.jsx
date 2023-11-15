import React from 'react'

import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'

import SettingsIcon from '@mui/icons-material/Settings'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer, playAudioContext } from './utils.audio'

function ControlSource(props) {
  const { use, codeInclued, codeMain, codeExclude } = props.source

  const playingTimeoutRef = React.useRef()

  const mouseDownRef = React.useRef()

  const mouseDownTimeoutRef = React.useRef()

  const [playing, setPlaying] = React.useState(false)

  const [codePress, setCodePress] = React.useState([])

  const play = () => {
    playAudioContext(props.source)

    setPlaying(true)

    clearTimeout(playingTimeoutRef.current)

    playingTimeoutRef.current = setTimeout(() => setPlaying(false), 500)

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
    if (props.setting == true) return

    if (e.button !== 0) return

    if (use === true) play()

    mouseDownRef.current = true

    mouseDownTimeoutRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogPlaygroundAudio = props.source; return pre }), 500);
  }

  const onMouseMove = (e) => {
    if (props.setting == true) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (mouseDownRef.current === true && Imitation.state.dragTarget === null) Imitation.assignState({ dragTarget: props.source })

    clearInterval(mouseDownTimeoutRef.current)
  }

  const onMouseUp = (e) => {
    if (props.setting == true) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null) Imitation.assignState({ dragTarget: null })

    mouseDownRef.current = undefined

    clearInterval(mouseDownTimeoutRef.current)
  }

  const onTouchStart = (e) => {
    if (props.setting == true) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (use === true) play()

    mouseDownRef.current = true

    mouseDownTimeoutRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogPlaygroundAudio = props.source; return pre }), 500);
  }

  const onTouchMove = (e) => {
    if (props.setting == true) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (mouseDownRef.current === true && Imitation.state.dragTarget === null) Imitation.assignState({ dragTarget: props.source })

    clearInterval(mouseDownTimeoutRef.current)
  }

  const onTouchEnd = (e) => {
    if (props.setting == true) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null) Imitation.assignState({ dragTarget: null })

    mouseDownRef.current = undefined

    clearInterval(mouseDownTimeoutRef.current)
  }

  const onContextMenu = (e) => {
    if (props.setting == true) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    e.preventDefault()

    Imitation.setState(pre => { pre.dialogPlaygroundAudio = props.source; return pre })
  }

  const event = {
    onMouseDown: window.ontouchstart === undefined ? onMouseDown : undefined,
    onTouchStart: window.ontouchstart !== undefined ? onTouchStart : undefined,
    onContextMenu: onContextMenu,
  }

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
  }, [props.setting, props.source, codePress])

  return props.children(event, playing)
}

function App() {
  const audioIdSortRef = React.useRef(["PianoV1.A0", "PianoV1.A0M", "PianoV1.B0", "PianoV1.C1", "PianoV1.C1M", "PianoV1.D1", "PianoV1.D1M", "PianoV1.E1", "PianoV1.F1", "PianoV1.F1M", "PianoV1.G1", "PianoV1.G1M", "PianoV1.A1", "PianoV1.A1M", "PianoV1.B1", "PianoV1.C2", "PianoV1.C2M", "PianoV1.D2", "PianoV1.D2M", "PianoV1.E2", "PianoV1.F2", "PianoV1.F2M", "PianoV1.G2", "PianoV1.G2M", "PianoV1.A2", "PianoV1.A2M", "PianoV1.B2", "PianoV1.C3", "PianoV1.C3M", "PianoV1.D3", "PianoV1.D3M", "PianoV1.E3", "PianoV1.F3", "PianoV1.F3M", "PianoV1.G3", "PianoV1.G3M", "PianoV1.A3", "PianoV1.A3M", "PianoV1.B3", "PianoV1.C4", "PianoV1.C4M", "PianoV1.D4", "PianoV1.D4M", "PianoV1.E4", "PianoV1.F4", "PianoV1.F4M", "PianoV1.G4", "PianoV1.G4M", "PianoV1.A4", "PianoV1.A4M", "PianoV1.B4", "PianoV1.C5", "PianoV1.C5M", "PianoV1.D5", "PianoV1.D5M", "PianoV1.E5", "PianoV1.F5", "PianoV1.F5M", "PianoV1.G5", "PianoV1.G5M", "PianoV1.A5", "PianoV1.A5M", "PianoV1.B5", "PianoV1.C6", "PianoV1.C6M", "PianoV1.D6", "PianoV1.D6M", "PianoV1.E6", "PianoV1.F6", "PianoV1.F6M", "PianoV1.G6", "PianoV1.G6M", "PianoV1.A6", "PianoV1.A6M", "PianoV1.B6", "PianoV1.C7", "PianoV1.C7M", "PianoV1.D7", "PianoV1.D7M", "PianoV1.E7", "PianoV1.F7", "PianoV1.F7M", "PianoV1.G7", "PianoV1.G7M", "PianoV1.A7", "PianoV1.A7M", "PianoV1.B7", "PianoV1.C8"])
  const audioRef = React.useRef(JSON.parse(JSON.stringify(audioIdSortRef.current.map(i => Imitation.state.audio.filter(i => i._id === 'PianoV1').find(i_ => i_.id === i)))))
  const containerRef = React.useRef()
  const contentRef = React.useRef()
  const timeoutRef = React.useRef()

  const [consoleFullScreen, setConsoleFullScreen] = React.useState(Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true)
  const [setting, setSetting] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const [mock, setMock] = React.useState(false)
  const [mockLeft, setMockLeft] = React.useState([0, 4])
  const [mockRight, setMockRight] = React.useState([60, 64])
  const [audioSource, setAudioSource] = React.useState(audioRef.current)

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
    observer.observe(contentRef.current)

    return () => { clearTimeout(timeoutRef.current); observer.disconnect() }
  }, [consoleFullScreen, mock, contentRef.current])

  React.useEffect(async () => {
    const audio = audioRef.current

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

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: consoleFullScreen ? 0 : 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: consoleFullScreen ? 0 : 1, transition: '0.5s all' }} ref={el => containerRef.current = el}>

    {
      mock === true ?
        <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: setting ? 0.2 : 1 }]} style={{ position: 'absolute', zIndex: setting ? 1 : 3, height: 'fit-content', flexShrink: 0, display: 'flex', opacity: setting || mock === false ? 0.2 : 1, transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }} ref={el => contentRef.current = el}>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
              audioIdSortRef.current.map(i => audioSource.find(i_ => i_.id === i)).filter((i, index) => index >= mockLeft[0] && index <= mockLeft[1]).map((i, index) => {
                return <ControlSource key={index} source={i} setting={setting}>
                  {
                    (event, playing) => {

                      var variant = ''

                      if (i.id.includes('M') === true && playing === true) variant = 'outlined'
                      if (i.id.includes('M') === true && playing === false) variant = 'contained'
                      if (i.id.includes('M') === false && playing === true) variant = 'contained'
                      if (i.id.includes('M') === false && playing === false) variant = 'outlined'

                      const style = {
                        width: 72,
                        height: 72,
                        margin: 8,
                        borderRadius: 12,
                        fontSize: 12,
                        boxShadow: `0 4px 8px gray`,
                        border: 'none',
                        transform: playing ? `rotate(${index % 2 === 0 ? 45 : -45}deg)` : 'rotate(0)',
                        background: variant === 'outlined' ? '#ffffff' : undefined,
                        opacity: i.use ? 1 : 0.35,
                        cursor: i.use ? 'pointer' : 'default',
                        transition: '0.5s all',
                      }

                      return <Button variant={variant} style={style} {...event}>{i.name}</Button>
                    }
                  }
                </ControlSource>
              })
            }
          </div>

          <div style={{ width: 32 }}></div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
              audioIdSortRef.current.map(i => audioSource.find(i_ => i_.id === i)).filter((i, index) => index >= mockRight[0] && index <= mockRight[1]).map((i, index) => {
                return <ControlSource key={index} source={i} setting={setting}>
                  {
                    (event, playing) => {

                      var variant = ''

                      if (i.id.includes('M') === true && playing === true) variant = 'outlined'
                      if (i.id.includes('M') === true && playing === false) variant = 'contained'
                      if (i.id.includes('M') === false && playing === true) variant = 'contained'
                      if (i.id.includes('M') === false && playing === false) variant = 'outlined'

                      const style = {
                        width: 72,
                        height: 72,
                        margin: 8,
                        borderRadius: 12,
                        fontSize: 12,
                        boxShadow: `0 4px 8px gray`,
                        border: 'none',
                        transform: playing ? `rotate(${index % 2 === 0 ? 45 : -45}deg)` : 'rotate(0)',
                        background: variant === 'outlined' ? '#ffffff' : undefined,
                        opacity: i.use ? 1 : 0.35,
                        cursor: i.use ? 'pointer' : 'default',
                        transition: '0.5s all',
                      }

                      return <Button variant={variant} style={style} {...event}>{i.name}</Button>
                    }
                  }
                </ControlSource>
              })
            }
          </div>
        </Animation>
        : null
    }

    {
      mock === false ?
        <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: setting ? 0.2 : 1 }]} style={{ position: 'absolute', zIndex: setting ? 1 : 3, height: 'fit-content', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: setting || mock === false ? 0.2 : 1, transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }} ref={el => contentRef.current = el}>
          {
            ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i, index) => {
              return <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  audioSource
                    .filter(i_ => i_.id.split('.')[1].includes(i))
                    .map((i, index) => {
                      return <ControlSource key={index} source={i} setting={setting}>
                        {
                          (event, playing) => {

                            var variant = ''

                            if (i.id.includes('M') === true && playing === true) variant = 'outlined'
                            if (i.id.includes('M') === true && playing === false) variant = 'contained'
                            if (i.id.includes('M') === false && playing === true) variant = 'contained'
                            if (i.id.includes('M') === false && playing === false) variant = 'outlined'

                            const style = {
                              width: 72,
                              height: 72,
                              margin: 8,
                              borderRadius: 12,
                              fontSize: 12,
                              boxShadow: `0 4px 8px gray`,
                              border: 'none',
                              transform: playing ? `rotate(${index % 2 === 0 ? 45 : -45}deg)` : 'rotate(0)',
                              background: variant === 'outlined' ? '#ffffff' : undefined,
                              opacity: i.use ? 1 : 0.35,
                              cursor: i.use ? 'pointer' : 'default',
                              transition: '0.5s all',
                            }

                            return <Button variant={variant} style={style} {...event}>{i.name}</Button>
                          }
                        }
                      </ControlSource>
                    })
                }
              </div>
            })
          }
        </Animation>
        : null
    }

    <Grid container spacing={1} style={{ position: 'absolute', zIndex: setting ? 3 : 1, width: 'calc(100% - 32px)', maxWidth: 600, height: 'fit-content', fontSize: 14, flexShrink: 0, opacity: setting ? 1 : 0, transition: '0.5s all' }}>
      <Grid item xs={12}>
        Scale<span style={{ outline: 'none', marginLeft: 8 }}>{scale}</span>
      </Grid>
      <Grid item xs={12}>
        <Slider value={scale} onChange={(e, v) => { setScale(v) }} min={0} max={2} step={0.1} />
      </Grid>
      {
        mock ?
          <>
            <Grid item xs={12}>
              Left Ranger<span style={{ outline: 'none', marginLeft: 8 }}>{mockLeft.join('-')}</span>
            </Grid>
            <Grid item xs={12}>
              <Slider value={mockLeft} onChange={(e, v) => { setMockLeft(v) }} min={0} max={audioIdSortRef.current.length} step={1} />
            </Grid>
            <Grid item xs={12}>
              Right Ranger<span style={{ outline: 'none', marginLeft: 8 }}>{mockRight.join('-')}</span>
            </Grid>
            <Grid item xs={12}>
              <Slider value={mockRight} onChange={(e, v) => { setMockRight(v) }} min={0} max={audioIdSortRef.current.length} step={1} />
            </Grid>
          </>
          : null
      }
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button style={{ margin: '0 8px' }} variant='contained' color={mock ? 'primary' : 'inherit'} onClick={(e) => { setMock(!mock) }}><SendIcon style={{ marginRight: 4 }} />Mock Instrument</Button>
        <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => setSetting(false)}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
      </Grid>
    </Grid>

    <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', top: 0, left: 0 }}></div>

    <Button variant='text' style={{ position: 'absolute', zIndex: 4, bottom: 16 }} onClick={() => setSetting(pre => !pre)}><SettingsIcon /></Button>

  </Animation >
}

export default Imitation.withBindRender(App, state => [state.dialogGlobalSetting, state.dialogExample, state.dialogLocalStorage, state.dialogConsoleTimeAlignment, state.dialogPlaygroundAudio, state.dialogConsoleAudio, state.dialogConsoleGroup, state.consoleExpand, state.consoleFullScreen, JSON.stringify(state.dragTarget), JSON.stringify(state.consoleCurrent), JSON.stringify(state.audio), JSON.stringify(state.audioSetting), JSON.stringify(state.globalSetting), JSON.stringify(state.theme)])