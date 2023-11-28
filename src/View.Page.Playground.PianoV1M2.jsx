import React from 'react'

import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'

import SettingsIcon from '@mui/icons-material/Settings'
import SaveIcon from '@mui/icons-material/Save'

import Animation from './View.Component.Animation'
import { ControlSource } from './View.Component.Playground'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer, playAudioContext } from './utils.audio'

function App() {
  const audioRef = React.useRef(JSON.parse(JSON.stringify(Imitation.state.audio.filter(i => i._id === 'PianoV1'))))
  const containerRef = React.useRef()
  const contentRef = React.useRef()
  const timeoutRef = React.useRef()

  const [consoleFullScreen, setConsoleFullScreen] = React.useState(Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true)
  const [scale, setScale] = React.useState(1)
  const [position, setPosition] = React.useState([27, 38, 51, 62])
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
  }, [consoleFullScreen, containerRef.current, contentRef.current])

  React.useEffect(async () => {
    if (audioSource === audioRef.current) {
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

      // console.log(audioBuffer.map(i => `{ name: "${i.name}", duration: ${i.audioBuffer.duration} },`).join('\n'))

      setAudioSource(audioBuffer)

      Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
    }

    if (audioSource !== audioRef.current) {
      const audio = audioSource

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

      setAudioSource(audio)

      Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
    }
  }, [Imitation.state.audioSetting])

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: consoleFullScreen ? 0 : 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: consoleFullScreen ? 0 : 1, transition: '0.5s all' }} ref={el => containerRef.current = el}>

    <div style={{ position: 'absolute', zIndex: 1, height: 'fit-content', flexShrink: 0, display: 'flex', transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }} ref={el => contentRef.current = el}>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          audioSource.filter((i, index) => index >= position[0] && index <= position[1]).map((i, index) => {
            return <ControlSource key={index} source={i}>
              {
                (event, playing) => {

                  var variant = ''

                  if (i.id.includes('M') === true && playing === true) variant = 'outlined'
                  if (i.id.includes('M') === true && playing === false) variant = 'contained'
                  if (i.id.includes('M') === false && playing === true) variant = 'contained'
                  if (i.id.includes('M') === false && playing === false) variant = 'outlined'

                  const style = {
                    width: 72,
                    height: 240,
                    margin: 8,
                    borderRadius: 12,
                    fontSize: 12,
                    boxShadow: `0 4px 8px gray`,
                    border: 'none',
                    transform: playing ? 'translateY(20%)' : 'translateY(0px)',
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
          audioSource.filter((i, index) => index >= position[2] && index <= position[3]).map((i, index) => {
            return <ControlSource key={index} source={i}>
              {
                (event, playing) => {

                  var variant = ''

                  if (i.id.includes('M') === true && playing === true) variant = 'outlined'
                  if (i.id.includes('M') === true && playing === false) variant = 'contained'
                  if (i.id.includes('M') === false && playing === true) variant = 'contained'
                  if (i.id.includes('M') === false && playing === false) variant = 'outlined'

                  const style = {
                    width: 72,
                    height: 240,
                    margin: 8,
                    borderRadius: 12,
                    fontSize: 12,
                    boxShadow: `0 4px 8px gray`,
                    border: 'none',
                    transform: playing ? 'translateY(20%)' : 'translateY(0px)',
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
    </div>

    <Slider style={{ position: 'absolute', zIndex: 2, width: '100%', maxWidth: 720, bottom: 16 }} value={position} onChange={(e, v) => { setPosition(v) }} min={0} max={audioSource.length} step={1} />

  </Animation >
}

export default Imitation.withBindRender(App, state => [state.consoleExpand, state.consoleFullScreen, JSON.stringify(state.audio), JSON.stringify(state.audioSetting), JSON.stringify(state.globalSetting)])