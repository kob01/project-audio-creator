import React from 'react'

import Imitation from './utils.imitation'

import { playAudioContext } from './utils.audio'

function ControlSourceComponent(props) {
  const { id, duration, use, codeInclued, codeMain, codeExclude } = props.source

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

    const pushThing = ['id', 'use', 'volume', 'rate', 'when', 'offset', 'duration'].reduce((t, i) => ({ ...t, [i]: props.source[i] }), {})

    Imitation.setState(pre => { pre.canvasAnimation = [pushThing]; pre.consoleRecord = [pushThing]; return pre })
  }

  const keydown = (e) => {
    if (use === false) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (codePress.includes(e.code)) return

    const result = [...codePress, e.code]

    setCodePress(result)

    if (codeMain.includes(result[result.length - 1]) && codeInclued.every(i => result.includes(i)) && codeExclude.every(i => !result.includes(i))) play()
  }

  const keyup = (e) => {
    if (use === false) return

    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    const result = codePress.filter(i => !i.includes(e.code))

    setCodePress(result)
  }

  const onMouseDown = (e) => {
    if (e.button !== 0) return

    if (use === true) play()

    mouseDownRef.current = true

    mouseDownTimeoutRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogPlaygroundAudio = props.source; return pre }), 500);
  }

  const onMouseMove = (e) => {
    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (mouseDownRef.current === true && Imitation.state.audioDragTarget === null) Imitation.assignState({ audioDragTarget: props.source })

    clearInterval(mouseDownTimeoutRef.current)
  }

  const onMouseUp = (e) => {
    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null) Imitation.assignState({ audioDragTarget: null })

    mouseDownRef.current = undefined

    clearInterval(mouseDownTimeoutRef.current)
  }

  const onTouchStart = (e) => {
    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (use === true) play()

    mouseDownRef.current = true

    mouseDownTimeoutRef.current = setTimeout(() => Imitation.setState(pre => { pre.dialogPlaygroundAudio = props.source; return pre }), 500);
  }

  const onTouchMove = (e) => {
    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (mouseDownRef.current === true && Imitation.state.audioDragTarget === null) Imitation.assignState({ audioDragTarget: props.source })

    clearInterval(mouseDownTimeoutRef.current)
  }

  const onTouchEnd = (e) => {
    if (Imitation.state.dialogGlobalSetting !== null || Imitation.state.dialogExample !== null || Imitation.state.dialogLocalStorage !== null || Imitation.state.dialogConsoleTimeAlignment !== null || Imitation.state.dialogPlaygroundAudio !== null || Imitation.state.dialogConsoleAudio !== null || Imitation.state.dialogConsoleGroup !== null) return

    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null) Imitation.assignState({ audioDragTarget: null })

    mouseDownRef.current = undefined

    clearInterval(mouseDownTimeoutRef.current)
  }

  const onContextMenu = (e) => {
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
  }, [props.source])

  React.useEffect(() => {
    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)

    return () => {
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
    }
  }, [props.source, codePress])

  return props.children(event, playing)
}

const ControlSource = Imitation.withBindRender(ControlSourceComponent, state => [state.dialogGlobalSetting, state.dialogExample, state.dialogLocalStorage, state.dialogConsoleTimeAlignment, state.dialogPlaygroundAudio, state.dialogConsoleAudio, state.dialogConsoleGroup, state.consoleExpand, JSON.stringify(state.audioDragTarget), JSON.stringify(state.consoleCurrent)])

export { ControlSource }