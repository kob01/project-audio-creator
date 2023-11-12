import React from 'react'

import Button from '@mui/material/Button'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import DeleteIcon from '@mui/icons-material/Delete'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import EditIcon from '@mui/icons-material/Edit'
import FolderZipIcon from '@mui/icons-material/FolderZip'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter'
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter'

import Imitation from './utils.imitation'
import { hash } from './utils.common'
import { loadAudioBuffer, parseAudioContextMultiple } from './utils.audio'

import Animation from './View.Component.Animation'

function ControlTime(props) {
  const mouseDownRef = React.useRef()

  const [active, setActive] = React.useState(false)

  const onMouseDown = (e) => {
    if (e.button !== 0) return

    const x = e.pageX
    const y = e.pageY

    mouseDownRef.current = [x, y]

    setActive(true)
  }

  const onMouseMove = (e) => {
    if (mouseDownRef.current === undefined) return

    const x = e.pageX
    const y = e.pageY

    const changeX = e.pageX - mouseDownRef.current[0]
    const changeY = e.pageY - mouseDownRef.current[1]

    mouseDownRef.current = [x, y]

    props.onMove(changeX, changeY)
  }

  const onMouseUp = (e) => {
    mouseDownRef.current = undefined

    setActive(false)
  }

  const onTouchStart = (e) => {
    const x = e.targetTouches[0].pageX
    const y = e.targetTouches[0].pageY

    mouseDownRef.current = [x, y]

    setActive(true)
  }

  const onTouchMove = (e) => {
    if (mouseDownRef.current === undefined) return

    const x = e.targetTouches[0].pageX
    const y = e.targetTouches[0].pageY

    const changeX = e.pageX - mouseDownRef.current[0]
    const changeY = e.pageY - mouseDownRef.current[1]

    mouseDownRef.current = [x, y]

    props.onMove(changeX, changeY)
  }

  const onTouchEnd = (e) => {
    mouseDownRef.current = undefined

    setActive(false)
  }

  const event = {
    onMouseDown: window.ontouchstart === undefined ? onMouseDown : undefined,
    onTouchStart: window.ontouchstart !== undefined ? onTouchStart : undefined,
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

  return props.children(event, active)
}

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
  const currentTimeOffsetRef = React.useRef()
  const currentTimeIdleRef = React.useRef()

  const [playing, setPlaying] = React.useState()
  const [buffer, setBuffer] = React.useState()
  const [source, setSource] = React.useState()
  const [sourceRender, setSourceRender] = React.useState()
  const [height, setHeight] = React.useState()
  const [maxTime, setMaxTime] = React.useState()
  const [currentTime, setCurrentTime] = React.useState()

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
      audioContextRef.current.audioContext.close()

      audioContextRef.current = undefined
    }

    const currentTime_ = currentTime === maxTime ? 0 : currentTime

    const context = parseAudioContextMultiple(buffer)

    audioContextRef.current = context

    currentTimeOffsetRef.current = currentTime_

    var maxLength = context.sources.length

    var currentLength = 0

    audioContextRef.current.sources.forEach(i => {
      var when = i.source.when
      var offset = i.source.offset
      var duration = i.source.duration

      var when = when - currentTime_

      if (when < 0) {
        offset = offset - when
        duration = duration + when
        when = 0
      }

      if (duration < 0) return maxLength = maxLength - 1

      const ended = () => {
        currentLength = currentLength + 1

        if (currentLength === maxLength) {
          setCurrentTime(maxTime)

          if (audioContextRef.current !== undefined) {
            audioContextRef.current.audioContext.close()

            audioContextRef.current = undefined
          }

          setPlaying()
        }
      }

      i.bufferSource.addEventListener('ended', ended)

      i.bufferSource.start(when, offset, duration)
    })


    setPlaying(true)

    if (currentTime_ === 0) setCurrentTime(0)
  }

  const pause = () => {
    if (audioContextRef.current !== undefined) {
      audioContextRef.current.audioContext.close()

      audioContextRef.current = undefined
    }

    setPlaying()
  }

  const clean = () => {
    if (audioContextRef.current !== undefined) {
      audioContextRef.current.audioContext.close()

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

  const edit = () => {
    Imitation.setState(pre => { pre.dialogConsoleGroup = Imitation.state.consoleCurrent; return pre })
  }

  const copy = () => {
    const current = Imitation.state.console.find(i => i.hash === Imitation.state.consoleCurrent.hash)
    const current_ = JSON.parse(JSON.stringify(current))

    current_.hash = hash()
    current_.group.forEach(i => i.hash = hash())

    Imitation.setState(pre => { pre.console.push(current_); return pre })
  }

  const up = () => {
    const current = Imitation.state.console.findIndex(i => i.hash === Imitation.state.consoleCurrent.hash)

    if (current === 0) return

    const [a, b] = [Imitation.state.console[current - 1], Imitation.state.console[current]]

    Imitation.state.console[current - 1] = b
    Imitation.state.console[current] = a

    Imitation.setState(pre => { pre.console = [...pre.console]; return pre })
  }

  const down = () => {
    const current = Imitation.state.console.findIndex(i => i.hash === Imitation.state.consoleCurrent.hash)

    if (current === Imitation.state.console.length - 1) return

    const [a, b] = [Imitation.state.console[current], Imitation.state.console[current + 1]]

    Imitation.state.console[current] = b
    Imitation.state.console[current + 1] = a

    Imitation.setState(pre => { pre.console = [...pre.console]; return pre })
  }

  const timeAlignment = () => {
    const onChange = (value) => {
      const all = Imitation.state.console.reduce((t, i) => [...t, ...i.group], [])

      source.forEach(i => {
        const console = all.find(i_ => i_.hash === i.hash)

        const a = Math.floor(console.when / value)

        const b = console.when % value

        if (b < value / 2) { console.when = a * value }
        if (b === value / 2) { console.when = a * value }
        if (b > value / 2) { console.when = a * value + value }
      })

      Imitation.dispatch()
    }

    Imitation.setState(pre => { pre.dialogConsoleTimeAlignment = { onChange: onChange }; return pre })
  }

  const timeSort = () => {
    Imitation.state.console.forEach(i => {
      i.group = i.group.sort((a, b) => a.when - b.when)
    })

    Imitation.dispatch()
  }

  const moveSource = (changeX, changeY, source) => {
    const current = Imitation.state.console.reduce((t, i) => [...t, ...i.group], []).find(i => i.hash === source.hash)

    const min = current.when

    const minChangeX = Math.max(changeX * maxTime * 0.001, -min)

    current.when = Math.max(current.when + minChangeX, 0)

    Imitation.dispatch()
  }

  const moveGroup = (changeX, changeY, group) => {
    const current = Imitation.state.console.find(i => i.hash === group.hash)

    const min = Math.min(...current.group.map(i => i.when))

    const minChangeX = Math.max(changeX * maxTime * 0.001, -min)

    current.group.forEach(source => {
      const current = Imitation.state.console.reduce((t, i) => [...t, ...i.group], []).find(i => i.hash === source.hash)

      current.when = Math.max(current.when + minChangeX, 0)
    })

    Imitation.dispatch()
  }

  const moveTime = (changeX, changeY) => {
    var time = currentTime + changeX * maxTime * 0.001

    if (time < 0) time = 0
    if (time > maxTime) time = maxTime

    setCurrentTime(time)
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
    if (playing === undefined) return

    const loop = () => {
      currentTimeIdleRef.current = requestIdleCallback(() => {
        setCurrentTime(audioContextRef.current.audioContext.currentTime + currentTimeOffsetRef.current)
        loop()
      })
    }

    loop()

    return () => {
      cancelIdleCallback(currentTimeIdleRef.current)
    }
  }, [playing])

  React.useEffect(() => {
    if (buffer !== undefined) setCurrentTime(0)
    if (buffer === undefined) setCurrentTime()
  }, [buffer])

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

    if (Imitation.state.consoleCurrent === null) Imitation.state.console.forEach(i => r.push(...i.group.map(i_ => ({ ...i_ }))))
    if (Imitation.state.consoleCurrent !== null) Imitation.state.console.forEach(i => i.hash === Imitation.state.consoleCurrent.hash ? r.push(...i.group.map(i_ => ({ ...i_ }))) : null)

    setSource(r)

    var r_ = []

    if (Imitation.state.consoleCurrent === null) {
      Imitation.state.console.forEach(i => r_.push({ ...i }))

      r_.forEach(i => {
        i.when = Math.min(...i.group.map(i => i.when))
        i.duration = Math.max(...i.group.map(i => i.when + i.duration - i.offset)) - i.when
        i.offset = 0
        i.rate = 1
        i.use = i.group.some(i => i.use === true)
      })
    }

    if (Imitation.state.consoleCurrent !== null) {
      Imitation.state.console.forEach(i => i.hash === Imitation.state.consoleCurrent.hash ? r_.push(...i.group.map(i_ => ({ ...i_, group: i.name }))) : null)

      r_.forEach(i => {
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
    }

    setSourceRender(r_)
  }, [JSON.stringify(Imitation.state.console), JSON.stringify(Imitation.state.consoleCurrent), JSON.stringify(Imitation.state.audioSetting), JSON.stringify(Imitation.state.audio)])

  return <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

    <div style={{ position: 'relative', margin: 'auto', width: 'calc(100% - 32px)', height: Imitation.state.consoleExpand ? height : 0, marginBottom: Imitation.state.consoleExpand ? 16 : 0, boxShadow: '0 4px 8px gray', borderRadius: 12, overflow: 'hidden', opacity: Imitation.state.consoleExpand ? 1 : 0, transition: '0.5s all' }}>
      <div style={{ position: 'absolute', width: '100%', height: height, bottom: 0, left: 0, display: 'flex', padding: 16, background: '#ffffff', transition: '0.5s all' }} ref={el => Imitation.state.consoleContainerRef = el}>

        <div style={{ width: 'fit-content', height: '100%', flexGrow: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {
            buffer === undefined ? <Button style={{ marginTop: 0 }} fullWidth variant='contained' onClick={() => load()}><FolderZipIcon /></Button> : null
          }
          {
            buffer !== undefined && playing !== undefined ? <Button style={{ marginTop: 0 }} fullWidth variant='contained' onClick={() => pause()}><PauseIcon /></Button> : null
          }
          {
            buffer !== undefined && playing === undefined ? <Button style={{ marginTop: 0 }} fullWidth variant='contained' onClick={() => play()}><PlayArrowIcon /></Button> : null
          }
          <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => add()}><PlaylistAddIcon /></Button>
          {
            Imitation.state.consoleCurrent ?
              <>
                <Button style={{ marginTop: 4 }} fullWidth variant='contained' color='error' onClick={() => remove()}><DeleteIcon /></Button>
                <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => edit()}><EditIcon /></Button>
                <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => copy()}><CopyAllIcon /></Button>
                <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => up()}><KeyboardArrowUpIcon /></Button>
                <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => down()}><KeyboardArrowDownIcon /></Button>
              </>
              : null
          }
          {
            Imitation.state.console.length > 0 ?
              <>
                <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => timeAlignment()}><AlignVerticalCenterIcon /></Button>
                <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => timeSort()}><AlignHorizontalCenterIcon /></Button>
              </>
              : null
          }
          <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => fullscreen()}><FullscreenIcon /></Button>
        </div>

        <div style={{ width: 16, height: '100%' }} />

        {
          Imitation.state.console.length > 0 ?
            <div style={{ height: '100%', flexGrow: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'auto' }}>
              {
                Imitation.state.console.map((i, index) => {
                  return <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} key={index} style={{ marginTop: index !== 0 ? 4 : 0, textAlign: 'left', transition: '0.5s all' }} fullWidth variant={i === Imitation.state.consoleCurrent ? 'contained' : 'outlined'} onClick={() => Imitation.setState(pre => { pre.consoleCurrent = pre.consoleCurrent && pre.consoleCurrent.hash === i.hash ? null : i; return pre })}>{i.name}</Animation>
                })
              }
            </div>
            : null
        }

        <div style={{ width: 0, height: '100%', flexGrow: 1, flexShrink: 0, padding: '0px 16px 8px 16px' }}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>

            {
              sourceRender !== undefined ?
                <div style={{ width: '100%', height: '100%', position: 'absolute', overflow: 'auto' }}>
                  {
                    sourceRender.map((i, index) => {
                      return <ControlSource key={index} onClick={() => { if (Imitation.state.consoleCurrent !== null) Imitation.assignState({ dialogConsoleAudio: i }); if (Imitation.state.consoleCurrent === null) Imitation.assignState({ dialogConsoleGroup: i }); }} onMove={(changeX, changeY) => { if (Imitation.state.consoleCurrent !== null) moveSource(changeX, changeY, i); if (Imitation.state.consoleCurrent === null) moveGroup(changeX, changeY, i); }}>
                        {
                          (event) => {
                            return <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: i.use ? 1 : 0.35 }]} variant={playing && currentTime >= i.when && currentTime <= i.when + i.duration ? 'contained' : 'outlined'} style={{ width: `${(i.duration - i.offset) / i.rate / maxTime * 100}%`, minWidth: 0, height: 36, position: 'absolute', left: `${i.when / maxTime * 100}%`, top: index * 44, paddingLeft: 0, paddingRight: 0, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', transition: '0.5s all' }} {...event}>{i.name}</Animation>
                          }
                        }
                      </ControlSource>
                    })
                  }
                  <div style={{ width: '100%', height: 16, position: 'absolute', top: sourceRender.length * 44 }}></div>
                </div>
                : null
            }

            <div style={{ width: '100%', height: 2, position: 'absolute', zIndex: 2, bottom: Imitation.state.console.length > 0 ? 12 : 'calc(50% - 1px)', transition: '0.5s all' }}>
              <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, bottom: 0, margin: 'auto', background: Imitation.state.theme.palette.primary.main, transition: '0.5s all' }}></div>

              <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                maxTime !== undefined ?
                  <Animation tag={'div'} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', fontSize: 12, transition: '0.5s all' }}>
                    {
                      new Array(11).fill().map((i, index) => {
                        return <div key={index} style={{ position: 'absolute', left: `${index * 10}%`, top: 8, width: 0, display: 'flex', justifyContent: 'center', color: Imitation.state.theme.palette.primary.main, transition: '0.5s all' }}>
                          <div style={{ whiteSpace: 'nowrap' }}>{Number(index * maxTime / 10).toFixed(2)}</div>
                        </div>
                      })
                    }
                  </Animation>
                  : null
              }
            </div>

            {
              buffer !== undefined && currentTime !== undefined ?
                <div style={{ width: 2, height: 'calc(100% - 12px)', position: 'absolute', zIndex: 3, left: `calc(${currentTime / maxTime * 100}% - ${currentTime / maxTime * 2}px)`, transition: playing ? 'none' : '0.5s all' }}>
                  <ControlTime onMove={(changeX, changeY) => moveTime(changeX, changeY)}>
                    {
                      (event, active) => {
                        return <Animation tag={'div'} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: '0.5s all' }}>
                          <div style={{ width: '100%', height: '100%', position: 'absolute', background: Imitation.state.theme.palette.primary.main, transition: '0.5s all' }}></div>
                          <div style={{ width: 12, height: 12, position: 'absolute', transform: active ? 'rotate(45deg)' : 'rotate(90deg)', cursor: 'pointer', background: Imitation.state.theme.palette.primary.main, transition: '0.5s all' }} {...event}></div>
                        </Animation>
                      }
                    }
                  </ControlTime>
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