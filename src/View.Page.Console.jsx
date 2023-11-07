import React from 'react'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import DeleteIcon from '@mui/icons-material/Delete'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import EditIcon from '@mui/icons-material/Edit'
import FolderZipIcon from '@mui/icons-material/FolderZip'

import Imitation from './utils.imitation'
import { hash } from './utils.common'
import { loadAudioBuffer, parseAudioContext } from './utils.audio'
import { TextFieldSX } from './utils.mui.sx'

import Animation from './View.Component.Animation'

function ControlSource(props) {
  const mouseTimeRef = React.useRef()
  const mouseDownRef = React.useRef()

  const onMouseDown = (e) => {
    if (e.button !== 0) return

    const x = e.pageX
    const y = e.pageY

    mouseDownRef.current = [x, y]

    mouseTimeRef.current = setTimeout(() => props.onClick(), 500);
  }

  const onMouseMove = (e) => {
    if (mouseDownRef.current === undefined) return

    const x = e.pageX
    const y = e.pageY

    const changeX = e.pageX - mouseDownRef.current[0]
    const changeY = e.pageY - mouseDownRef.current[1]

    mouseDownRef.current = [x, y]

    props.onMove(changeX, changeY)

    clearInterval(mouseTimeRef.current)
  }

  const onMouseUp = (e) => {
    mouseDownRef.current = undefined

    clearInterval(mouseTimeRef.current)
  }

  const onTouchStart = (e) => {
    const x = e.targetTouches[0].pageX
    const y = e.targetTouches[0].pageY

    mouseDownRef.current = [x, y]

    mouseTimeRef.current = setTimeout(() => props.onClick(), 500);
  }

  const onTouchMove = (e) => {
    if (mouseDownRef.current === undefined) return

    const x = e.targetTouches[0].pageX
    const y = e.targetTouches[0].pageY

    const changeX = e.pageX - mouseDownRef.current[0]
    const changeY = e.pageY - mouseDownRef.current[1]

    mouseDownRef.current = [x, y]

    props.onMove(changeX, changeY)

    clearInterval(mouseTimeRef.current)
  }

  const onTouchEnd = (e) => {
    mouseDownRef.current = undefined

    clearInterval(mouseTimeRef.current)
  }

  const onContextMenu = (e) => {
    e.preventDefault()

    props.onClick()
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
  }, [props.onMove])

  return props.children(event)
}

function App() {
  const audioContextRef = React.useRef()

  const [playing, setPlaying] = React.useState()
  const [buffer, setBuffer] = React.useState()
  const [source, setSource] = React.useState()
  const [height, setHeight] = React.useState()
  const [maxTime, setMaxTime] = React.useState()

  const load = async () => {
    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    const source_ = JSON.parse(JSON.stringify(source.filter(i => i.use === true)))

    source_.forEach(i => Object.assign(i, { ...Imitation.state.audio.find(i_ => i_.id === i.id), ...i }))

    const r = await loadAudioBuffer(source_)

    setBuffer(r)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }

  const play = () => {
    if (audioContextRef.current !== undefined) {
      audioContextRef.current.forEach(i => {
        i.bufferSource.stop()
        i.audioContext.close()
      })

      audioContextRef.current = undefined
    }

    const context = buffer.map(i => ({ source: i, ...parseAudioContext(i) }))

    audioContextRef.current = context

    var maxLength = context.length

    var currentLength = 0

    audioContextRef.current.forEach(i => {
      const ended = () => {
        i.audioContext.close()

        audioContextRef.current = audioContextRef.current.filter(i_ => i_ !== i)

        currentLength = currentLength + 1

        if (currentLength === maxLength) {
          audioContextRef.current = undefined

          setPlaying()
        }
      }

      i.bufferSource.addEventListener('ended', ended)

      const when = i.source.when
      const offset = i.source.offset
      const duration = i.source.duration

      i.bufferSource.start(when, offset, duration)
    })

    setPlaying(true)
  }

  const pause = () => {
    if (audioContextRef.current !== undefined) {
      audioContextRef.current.forEach(i => {
        i.bufferSource.stop()
        i.audioContext.close()
      })

      audioContextRef.current = undefined
    }

    setPlaying()
  }

  const clean = () => {
    if (audioContextRef.current !== undefined) {
      audioContextRef.current.forEach(i => {
        i.bufferSource.stop()
        i.audioContext.close()
      })

      audioContextRef.current = undefined
    }

    setPlaying()
    setBuffer()
  }

  const add = () => {
    Imitation.setState(pre => { pre.console.push({ hash: hash(6), name: hash(6), group: [] }); return pre })
  }

  const remove = () => {
    Imitation.setState(pre => { pre.console = pre.console.filter(i => i.hash !== pre.consoleCurrent.hash); pre.consoleCurrent = null; return pre })
  }

  const rename = () => {
    Imitation.setState(pre => { pre.dialogConsoleRename = Imitation.state.consoleCurrent; return pre })
  }

  const move = (changeX, changeY, source) => {
    const current = Imitation.state.console.reduce((t, i) => [...t, ...i.group], []).find(i => i.hash === source.hash)

    current.when = Math.max(current.when + changeX * maxTime * 0.001, 0)

    Imitation.dispatch()
  }

  const expand = () => {
    Imitation.setState(pre => { pre.consoleExpand = !pre.consoleExpand; return pre })
  }

  const fullscreen = () => {
    Imitation.setState(pre => { pre.consoleFullScreen = !pre.consoleFullScreen; return pre })
  }

  React.useEffect(() => {
    const resize = () => {
      const r = Imitation.state.consoleFullScreen ? window.innerHeight - 136 : 300

      setHeight(r)
    }

    resize()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [Imitation.state.consoleFullScreen])

  React.useEffect(() => {
    if (Imitation.state.consoleExpand === true) {
      clean()
    }
  }, [JSON.stringify(Imitation.state.console), JSON.stringify(Imitation.state.consoleCurrent), Imitation.state.consoleExpand])

  React.useEffect(() => {
    var source = []

    if (Imitation.state.consoleCurrent === null) Imitation.state.console.forEach(i => source.push(...i.group))
    if (Imitation.state.consoleCurrent !== null) Imitation.state.console.forEach(i => i.hash === Imitation.state.consoleCurrent.hash ? source.push(...i.group) : null)

    const r = source.length > 0 ? Math.max(...source.map((i) => i.when + i.duration / i.rate)) : 0

    setMaxTime(r)
  }, [JSON.stringify(Imitation.state.console), JSON.stringify(Imitation.state.consoleCurrent)])

  React.useEffect(() => {
    var r = []

    if (Imitation.state.consoleCurrent === null) Imitation.state.console.forEach(i => r.push(...i.group.map(i_ => ({ ...i_, group: i.name }))))
    if (Imitation.state.consoleCurrent !== null) Imitation.state.console.forEach(i => i.hash === Imitation.state.consoleCurrent.hash ? r.push(...i.group.map(i_ => ({ ...i_, group: i.name }))) : null)

    r.forEach(i => {
      if (i.name === undefined) {
        const audioSetting = Imitation.state.audioSetting.find(i_ => i_.id === i.id)
        if (audioSetting) i.name = audioSetting.name
      }
      if (i.name === undefined) {
        const audio = Imitation.state.audio.find(i_ => i_.id === i.id)
        if (audio) i.name = audio.name
      }

      i.name = i.group + '.' + i.name
    })

    setSource(r)
  }, [JSON.stringify(Imitation.state.console), JSON.stringify(Imitation.state.consoleCurrent), JSON.stringify(Imitation.state.audioSetting), JSON.stringify(Imitation.state.audio)])

  return <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

    <div style={{ position: 'relative', margin: 'auto', width: 'calc(100% - 32px)', height: Imitation.state.consoleExpand ? height : 0, marginBottom: Imitation.state.consoleExpand ? 16 : 0, boxShadow: '0 4px 8px gray', borderRadius: 12, overflow: 'hidden', opacity: Imitation.state.consoleExpand ? 1 : 0, transition: '0.5s all' }}>
      <div style={{ position: 'absolute', width: '100%', height: height, bottom: 0, left: 0, display: 'flex', padding: 16, background: '#ffffff', transition: '0.5s all' }} ref={el => Imitation.state.consoleContainerRef = el}>

        <div style={{ height: '100%', flexGrow: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {
            !buffer ? <Button style={{ marginTop: 0 }} fullWidth variant='contained' onClick={() => load()}><FolderZipIcon /></Button> : null
          }
          {
            buffer && playing ? <Button style={{ marginTop: 0 }} fullWidth variant='contained' onClick={() => pause()}><PauseIcon /></Button> : null
          }
          {
            buffer && !playing ? <Button style={{ marginTop: 0 }} fullWidth variant='contained' onClick={() => play()}><PlayArrowIcon /></Button> : null
          }
          <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => add()}><PlaylistAddIcon /></Button>
          {
            Imitation.state.consoleCurrent ?
              <>
                <Button style={{ marginTop: 4 }} fullWidth variant='contained' color='error' onClick={() => remove()}><DeleteIcon /></Button>
                <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => rename()}><EditIcon /></Button>
              </>
              : null
          }
          <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => fullscreen()}><FullscreenIcon /></Button>
        </div>

        <div style={{ width: 16, height: '100%' }} />

        {
          Imitation.state.console.length > 0 ?
            <>
              <div style={{ height: '100%', flexGrow: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'auto' }}>
                {
                  Imitation.state.console.map((i, index) => {
                    return <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} key={i.hash} style={{ marginTop: index !== 0 ? 4 : 0, textAlign: 'left', transition: '0.5s all' }} fullWidth variant={i === Imitation.state.consoleCurrent ? 'contained' : 'outlined'} onClick={() => Imitation.setState(pre => { pre.consoleCurrent = pre.consoleCurrent && pre.consoleCurrent.hash === i.hash ? null : i; return pre })}>{i.name}</Animation>
                  })
                }
              </div>

              <div style={{ width: 16, height: '100%' }} />
            </>
            : null
        }

        <div style={{ width: 0, height: '100%', flexGrow: 1, flexShrink: 0, padding: '0px 8px' }}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>

            <div style={{ width: '100%', height: 2, position: 'absolute', zIndex: 2, bottom: Imitation.state.console.length > 0 ? 12 : 'calc(50% - 1px)', transition: '0.5s all' }}>
              <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, bottom: 0, margin: 'auto', background: Imitation.state.theme.palette.primary.main, transition: '0.5s all' }}></div>

              <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center' }}>
                {
                  new Array(101).fill().map((i, index) => {
                    if (index % 10 === 0) {
                      return <div key={index} style={{ position: 'absolute', left: `calc(${index}% - ${index * 2 / 100}px)`, width: 2, height: 8, background: Imitation.state.theme.palette.primary.main, transition: '0.5s all' }}></div>
                    }
                    if (index % 5 === 0) {
                      return <div key={index} style={{ position: 'absolute', left: `calc(${index}% - ${index * 2 / 100}px)`, width: 2, height: 6, background: Imitation.state.theme.palette.primary.main, transition: '0.5s all' }}></div>
                    }
                    if (index % 10 !== 0 && index % 5 !== 0) {
                      return <div key={index} style={{ position: 'absolute', left: `calc(${index}% - ${index * 2 / 100}px)`, width: 2, height: 4, background: Imitation.state.theme.palette.primary.main, transition: '0.5s all' }}></div>
                    }
                  })
                }
              </div>

              {
                maxTime ?
                  <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center' }}>
                    {
                      new Array(11).fill().map((i, index) => {
                        return <Animation tag={'div'} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} key={index} style={{ position: 'absolute', left: `${index * 10}%`, top: 8, width: 0, display: 'flex', justifyContent: 'center', color: Imitation.state.theme.palette.primary.main, transition: '0.5s all' }}>
                          <div style={{ whiteSpace: 'nowrap' }}>{Number(index * maxTime / 10).toFixed(2)}</div>
                        </Animation>
                      })
                    }
                  </div>
                  : null
              }
            </div>

            {
              source ?
                <div style={{ width: '100%', height: '100%', position: 'absolute', overflow: 'auto' }}>
                  {
                    source.map((i, index) => {
                      return <ControlSource key={i.hash} maxTime={maxTime} onClick={() => Imitation.assignState({ dialogConsoleAudioSetting: i })} onMove={(changeX, changeY) => move(changeX, changeY, i)}>
                        {
                          (event) => {
                            return <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: i.use ? 1 : 0.35 }]} key={i.hash} variant='outlined' style={{ width: `${i.duration / i.rate / maxTime * 100}%`, height: 40, left: `${i.when / maxTime * 100}%`, top: index * 48, position: 'absolute', fontSize: 12, transition: '0.5s all' }} {...event}>{i.name}</Animation>
                          }
                        }
                      </ControlSource>
                    })
                  }

                  <div style={{ width: '100%', height: 16, position: 'absolute', top: source.length * 48 }}></div>
                </div>
                : null
            }

          </div>
        </div>

      </div>
    </div>

    <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ width: 'fit-content', marginBottom: 16, transition: '0.5s all' }} variant='contained' onClick={() => expand()}>Expand Console</Animation>

  </div>
}

export default Imitation.withBindRender(App, state => [state.consoleExpand, state.consoleFullScreen, JSON.stringify(state.dragTarget), JSON.stringify(state.console), JSON.stringify(state.consoleCurrent), JSON.stringify(state.audio), JSON.stringify(state.audioSetting), JSON.stringify(state.theme)])