import React from 'react'

import Imitation from './utils.imitation'

function App() {
  const canvas = React.useRef()

  const [views, setViews] = React.useState([])

  const loop = () => {
    requestAnimationFrame(() => {
      
      const context = canvas.current.getContext('2d')

      context.clearRect(0, 0, canvas.current.width, canvas.current.height)

      loop()
    })
  }

  React.useEffect(() => {
    loop()
  },[])

  React.useEffect(() => {
    if (Imitation.state.times === 0) return

    const view = {}

    setViews(pre => [...pre.filter(i => i.end === false), view])
    
  }, [Imitation.state.times])

  return <canvas style={{ position: 'absolute', zIndex: -1, top: 0, left: 0, width: '100%', height: '100%' }} ref={el => canvas.current = el}></canvas> 
}

export default Imitation.withBindRender(App, state => [state.times])