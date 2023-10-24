import React from 'react'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'

import { includesArray } from './utils.common'
import { loadAudioBuffer, playAudioBuffer } from './utils.audio'

function ConsoleButton(props) {
  const { id, name, codeInclued, codeMain, codeExclude } = props.source

  const playTimeRef = React.useRef()

  const [playTime, setPlayTime] = React.useState(false)

  const [codePress, setCodePress] = React.useState([])

  const play = () => {
    playAudioBuffer(props.source)

    setPlayTime(true)

    clearTimeout(playTimeRef.current)

    playTimeRef.current = setTimeout(() => setPlayTime(false), 500)

    Imitation.setState(pre => { pre.times = pre.times + 1; return pre })
  }

  const ifPlay = (codePress) => {
    if (codeMain && codeMain.length !== 0 && !codeMain.includes(codePress[codePress.length - 1])) return
    if (codeExclude && codeExclude.length !== 0 && includesArray(codeExclude, codePress)) return
    if (!codeInclued.some(i => includesArray(i, codePress))) return

    play()
  }

  const onMouseDown = (e) => {
    if (e.button !== 0) return

    play()
  }

  const onTouchStart = (e) => {
    play()
  }

  const onContextMenu = (e) => {
    e.preventDefault()

    Imitation.setState(pre => { pre.dialogAudioSingleSetting = true; pre.audioSingleSetting = id; return pre })
  }

  const style = React.useMemo(() => {
    const active = playTime

    const r = {
      display: 'inline-block',
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: '0.5s all',
      width: 72,
      height: 72,
      margin: 8,
      borderRadius: 12,
      fontWeight: 'bold',
      position: 'relative',
      fontSize: 12,
      boxShadow: '0 4px 8px gray',
      transform: active ? `rotate(${Math.random() < 0.5 ? 45 : -45}deg)` : 'rotate(0)',
    }

    if (name.includes('M') === true) Object.assign(r, { background: active ? 'white' : 'black', color: active ? 'black' : 'white' })
    if (name.includes('M') === false) Object.assign(r, { background: active ? 'black' : 'white', color: active ? 'white' : 'black' })

    return r
  }, [playTime, codePress])

  React.useEffect(() => {
    const keydown = (e) => {
      const result = codePress.includes(e.code) ? codePress : [...codePress, e.code]
      setCodePress(result)

      ifPlay(result)
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
  }, [codePress])

  return <div style={style} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onContextMenu={onContextMenu}>{name}</div>
}

function App() {
  const audioRef = React.useRef(Imitation.state.audio.filter(i => i._id === 'SimplePiano'))

  const [audioSource, setAudioSource] = React.useState(audioRef.current)

  React.useEffect(async () => {
    Imitation.state.audioMultipleSetting = 'SimplePiano'

    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })

    audioRef.current.forEach(i => {
      const find = Imitation.state.audioSetting.find(i_ => i.id === i_.id)

      if (find) Object.assign(i, find)
    })

    const source = await loadAudioBuffer(audioRef.current)

    setAudioSource(source)

    Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
  }, [Imitation.state.audioSetting])

  return <Animation tag='div' restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.5s all' }}>

    <div style={{ width: 1500, height: 1000, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      {
        ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i, index) => {
          return <div key={index} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {
              audioSource.filter(i_ => i_.name.includes(i)).map((i, index) => <ConsoleButton key={index} source={i} />)
            }
          </div>
        })
      }
    </div>

  </Animation>
}

export default App