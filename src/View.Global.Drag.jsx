import React from 'react'

import Button from '@mui/material/Button'

import MusicNoteIcon from '@mui/icons-material/MusicNote'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'
import { hash, getResizePageRate } from './utils.common'

function App() {
  const [position, setPosition] = React.useState([0, 0])
  const [intersection, setIntersection] = React.useState(false)
  const [contentRect, setContentRect] = React.useState()

  const onMouseMove = e => {
    const x = e.pageX / getResizePageRate()
    const y = e.pageY / getResizePageRate()
    setPosition([x, y])
  }

  const onMouseUp = e => {
    if (intersection === true) {
      const dragTarget = Imitation.state.dragTarget
      const item = { hash: hash(), id: dragTarget.id, use: true, volume: dragTarget.volume, when: dragTarget.when, offset: dragTarget.offset, duration: dragTarget.duration, rate: dragTarget.rate }
      Imitation.state.console.find(i => i.hash === Imitation.state.consoleCurrent.hash).group.push(item)
    }

    setPosition([0, 0])
    setIntersection(false)

    Imitation.state.dragTarget = null
    Imitation.dispatch()
  }

  const onTouchMove = e => {
    const x = e.targetTouches[0].pageX / getResizePageRate()
    const y = e.targetTouches[0].pageY / getResizePageRate()
    setPosition([x, y])
  }

  const onTouchEnd = e => {
    if (intersection === true) {
      const dragTarget = Imitation.state.dragTarget
      const item = { hash: hash(), id: dragTarget.id, use: true, volume: dragTarget.volume, when: dragTarget.when, offset: dragTarget.offset, duration: dragTarget.duration, rate: dragTarget.rate }
      Imitation.state.console.find(i => i.hash === Imitation.state.consoleCurrent.hash).group.push(item)
    }

    Imitation.state.dragTarget = null
    Imitation.dispatch()
  }

  React.useEffect(() => {
    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null || Imitation.state.dragTarget === null) return null

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

  }, [Imitation.state.consoleExpand, Imitation.state.consoleCurrent, Imitation.state.dragTarget, intersection])

  React.useEffect(() => {
    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null || Imitation.state.dragTarget === null) return null

    if (Imitation.state.consoleContainerRef === null) return

    const observer = new ResizeObserver((en) => {
      setContentRect(Imitation.state.consoleContainerRef.getBoundingClientRect())
    })

    observer.observe(Imitation.state.consoleContainerRef)

    return () => observer.disconnect()
  }, [Imitation.state.consoleExpand, Imitation.state.consoleCurrent, Imitation.state.dragTarget, Imitation.state.consoleContainerRef])

  React.useEffect(() => {
    if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null || Imitation.state.dragTarget === null) return null

    if (contentRect === undefined) return

    const r = position[0] > contentRect.left / getResizePageRate() && position[0] < contentRect.right / getResizePageRate() && position[1] > contentRect.top / getResizePageRate() && position[1] < contentRect.bottom / getResizePageRate()

    setIntersection(r)
  }, [Imitation.state.consoleExpand, Imitation.state.consoleCurrent, Imitation.state.dragTarget, position, contentRect])

  if (Imitation.state.consoleExpand === false || Imitation.state.consoleCurrent === null || Imitation.state.dragTarget === null) return null

  return <Animation tag={Button} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant={intersection ? 'contained' : 'outlined'} style={{ minWidth: 0, width: '2.25rem', height: '2.25rem', position: 'absolute', zIndex: 103, left: position[0] - 16, top: position[1] - 16, transitionDuration: '0.5s', transitionProperty: 'opacity, color, background' }}><MusicNoteIcon /></Animation >
}

export default Imitation.withBindRender(App, state => [state.consoleExpand, state.consoleContainerRef, JSON.stringify(state.dragTarget), JSON.stringify(state.consoleCurrent)])