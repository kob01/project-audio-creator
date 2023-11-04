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

import Imitation from './utils.imitation'
import { hash } from './utils.common'
import { TextFieldSX } from './utils.mui.sx'

import Animation from './View.Component.Animation'

function ConsoleSource(props) {
  const onClick = () => {
    Imitation.assignState({ dialogConsoleAudioSetting: props.source })
  }

  const style = React.useMemo(() => {
    const r = {
      width: props.width,
      height: props.height,
      left: props.left,
      top: props.top,
      position: 'absolute',
      fontSize: 12,
      opacity: props.source.use ? 1 : 0.35,
      transition: '0.5s all',
    }

    return r
  }, [props.source.use, props.width, props.height, props.left, props.top])

  return <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: props.source.use ? 1 : 0.35 }]} variant='outlined' style={style} onClick={onClick}>{props.name}</Animation>
}

function App() {
  const expand = () => Imitation.setState(pre => { pre.consoleExpand = !pre.consoleExpand; return pre })

  const consoleAdd = () => Imitation.setState(pre => { pre.console.push({ name: hash(6), group: [] }); return pre })

  const consoleDelete = () => Imitation.setState(pre => { pre.console = pre.console.filter(i => i !== pre.consoleCurrent); pre.consoleCurrent = null; return pre })

  const fullscreen = () => Imitation.setState(pre => { pre.consoleFullScreen = !pre.consoleFullScreen; return pre })

  const maxTime = Imitation.state.consoleCurrent && Imitation.state.consoleCurrent.group.length > 0 ? Math.max(...Imitation.state.consoleCurrent.group.map((i) => i.when + i.duration / i.rate)) : 0

  const height = Imitation.state.consoleFullScreen ? window.innerHeight - 136 : 300

  React.useEffect(() => {
    if (Imitation.state.console.length > 0 && Imitation.state.consoleCurrent === null) {
      Imitation.setState(pre => { pre.consoleCurrent = pre.console[0]; return pre })
    }
  }, [JSON.stringify(Imitation.state.console)])

  return <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

    <div style={{ position: 'relative', margin: 'auto', width: 'calc(100% - 32px)', height: Imitation.state.consoleExpand ? height : 0, marginBottom: Imitation.state.consoleExpand ? 16 : 0, boxShadow: '0 4px 8px gray', borderRadius: 12, overflow: 'hidden', opacity: Imitation.state.consoleExpand ? 1 : 0, transition: '0.5s all' }}>
      <div style={{ position: 'absolute', width: '100%', height: height, bottom: 0, left: 0, display: 'flex', padding: 16, background: '#ffffff', transition: '0.5s all' }} ref={el => Imitation.state.consoleContainerRef = el}>

        <div style={{ height: '100%', flexGrow: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          <Button fullWidth variant='contained'><PlayArrowIcon /></Button>
          <Button style={{ marginTop: 4 }} fullWidth variant='contained'><PauseIcon /></Button>
          <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => consoleAdd()}><PlaylistAddIcon /></Button>
          {
            Imitation.state.consoleCurrent ?
              <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ marginTop: 4, transition: '0.5s all' }} fullWidth variant='contained' color='error' onClick={() => consoleDelete()}><DeleteIcon /></Animation>
              : null
          }
          <Button style={{ marginTop: 4 }} fullWidth variant='contained' onClick={() => fullscreen()}><FullscreenIcon /></Button>
        </div>

        <Divider style={{ margin: '0 8px', borderColor: '#ffffff' }} orientation='vertical' />

        <div style={{ height: '100%', flexGrow: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {
            Imitation.state.console.map((i, index) => {
              return <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} key={index} style={{ marginTop: index !== 0 ? 4 : 0, textAlign: 'left', transition: '0.5s all' }} fullWidth variant={i === Imitation.state.consoleCurrent ? 'contained' : 'outlined'} onClick={() => Imitation.setState(pre => { pre.consoleCurrent = i; return pre })}>{i.name}</Animation>
            })
          }
        </div>

        {
          Imitation.state.console.length > 0 ? <Divider style={{ margin: '0 8px', borderColor: '#ffffff' }} orientation='vertical' /> : null
        }

        <div style={{ width: 0, height: '100%', flexGrow: 1, flexShrink: 0, padding: '0px 8px' }}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>

            <div style={{ width: '100%', height: 2, position: 'absolute', zIndex: 2, bottom: Imitation.state.consoleCurrent && Imitation.state.consoleCurrent.group.length > 0 ? 12 : 'calc(50% - 1px)', transition: '0.5s all' }}>
              <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, bottom: 0, margin: 'auto', background: Imitation.state.theme.palette.primary.main }}></div>

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
              Imitation.state.consoleCurrent ?
                <div style={{ width: '100%', height: '100%', position: 'absolute', overflow: 'auto' }}>
                  {
                    Imitation.state.consoleCurrent.group.map((i, index) => {
                      var name = undefined

                      if (name === undefined) {
                        const audioSetting = Imitation.state.audioSetting.find(i_ => i_.id === i.id)
                        if (audioSetting) name = audioSetting.name
                      }
                      if (name === undefined) {
                        const audio = Imitation.state.audio.find(i_ => i_.id === i.id)
                        if (audio) name = audio.name
                      }

                      return <ConsoleSource key={index} source={i} name={name} width={`${i.duration / i.rate / maxTime * 100}%`} height={40} top={index * 48} left={`${i.when / maxTime * 100}%`} />
                    })
                  }

                  <div style={{ width: '100%', height: 16, position: 'absolute', top: Imitation.state.consoleCurrent.group.length * 48 }}></div>
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

export default Imitation.withBindRender(App, state => [state.dragTarget, state.consoleExpand, state.consoleFullScreen, JSON.stringify(state.console), JSON.stringify(state.consoleCurrent), JSON.stringify(state.audioSetting), JSON.stringify(state.audio), JSON.stringify(state.theme)])