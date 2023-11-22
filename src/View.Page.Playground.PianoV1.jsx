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
  const [setting, setSetting] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const [type, setType] = React.useState(0)
  const [mockLeft, setMockLeft] = React.useState([27, 38])
  const [mockRight, setMockRight] = React.useState([51, 62])
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

    {
      type === 0 ?
        <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: setting ? 0.2 : 1 }]} style={{ position: 'absolute', zIndex: setting ? 1 : 3, height: 'fit-content', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: setting || type === 0 ? 1 : 0.2, transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }} ref={el => contentRef.current = el}>
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

    {
      type === 1 ?
        <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: setting ? 0.2 : 1 }]} style={{ position: 'absolute', zIndex: setting ? 1 : 3, height: 'fit-content', flexShrink: 0, display: 'flex', opacity: setting || type === 1 ? 1 : 0.2, transition: '0.5s all', transform: `scale(${scale * Imitation.state.globalSetting.scale})` }} ref={el => contentRef.current = el}>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
              audioSource.filter((i, index) => index >= mockLeft[0] && index <= mockLeft[1]).map((i, index) => {
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
              audioSource.filter((i, index) => index >= mockRight[0] && index <= mockRight[1]).map((i, index) => {
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
      <Grid item xs={12}>
        Type {type}
      </Grid>
      <Grid item xs={12}>
        <Slider value={type} onChange={(e, v) => { setType(v) }} min={0} max={1} step={1} />
      </Grid>
      {
        type === 1 ?
          <>
            <Grid item xs={12}>
              Left Ranger<span style={{ outline: 'none', marginLeft: 8 }}>{mockLeft.join('-')}</span>
            </Grid>
            <Grid item xs={12}>
              <Slider value={mockLeft} onChange={(e, v) => { setMockLeft(v) }} min={0} max={audioSource.length} step={1} />
            </Grid>
            <Grid item xs={12}>
              Right Ranger<span style={{ outline: 'none', marginLeft: 8 }}>{mockRight.join('-')}</span>
            </Grid>
            <Grid item xs={12}>
              <Slider value={mockRight} onChange={(e, v) => { setMockRight(v) }} min={0} max={audioSource.length} step={1} />
            </Grid>
          </>
          : null
      }
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button style={{ margin: '0 8px' }} variant='contained' onClick={() => setSetting(false)}><SaveIcon style={{ marginRight: 4 }} />Save</Button>
      </Grid>
    </Grid>

    <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', top: 0, left: 0 }} onClick={() => setSetting(false)}></div>

    <Button variant='text' style={{ position: 'absolute', zIndex: 4, bottom: 16 }} onClick={() => setSetting(pre => !pre)}><SettingsIcon /></Button>

  </Animation >
}

export default Imitation.withBindRender(App, state => [state.consoleExpand, state.consoleFullScreen,   JSON.stringify(state.audio), JSON.stringify(state.audioSetting), JSON.stringify(state.globalSetting)])