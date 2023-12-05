import React from 'react'

import Button from '@mui/material/Button'

import Animation from './View.Component.Animation'
import { ControlSource } from './View.Component.Playground'

import Imitation from './utils.imitation'

import { requestIdleCallbackProcess } from './utils.common'
import { loadAudioBuffer } from './utils.audio'

function App() {
  const audioRef = React.useRef(JSON.parse(JSON.stringify(Imitation.state.audio.filter(i => i._id === 'ClassicalChoirMale'))))
  const containerRef = React.useRef()
  const contentRef = React.useRef()
  const timeoutRef = React.useRef()

  const [scale, setScale] = React.useState(1)
  const [audioSource, setAudioSource] = React.useState(audioRef.current)

  React.useEffect(() => {
    if (Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true) return null

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
  }, [Imitation.state.consoleFullScreen, Imitation.state.consoleExpand, containerRef.current, contentRef.current])

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

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: Imitation.state.consoleFullScreen === true && Imitation.state.consoleExpand === true ? 0 : 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.5s all' }} ref={el => containerRef.current = el}>

    <div style={{ position: 'absolute', zIndex: 1, height: 'fit-content', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }} ref={el => contentRef.current = el}>
      {
        ['A', 'M', 'O', 'U'].map((i, index) => {
          return <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
              audioSource
                .filter(i_ => i_.id.split('.')[1].includes(i))
                .map((i, index) => {
                  return <ControlSource key={index} source={i}>
                    {
                      (event, playing) => {

                        var variant = ''

                        if (playing === true) variant = 'outlined'
                        if (playing === false) variant = 'contained'

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
    </div>

  </Animation>
}

export default Imitation.withBindRender(App, state => [state.consoleExpand, state.consoleFullScreen, JSON.stringify(state.audio), JSON.stringify(state.audioSetting), JSON.stringify(state.globalSetting)])