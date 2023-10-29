import React from 'react'

import Imitation from './utils.imitation'

function App() {
  const canvasRef = React.useRef()

  const ImageRef = React.useRef(new Image())

  const viewRef = React.useRef([])

  const loop = () => {
    requestAnimationFrame(() => {

      const context = canvasRef.current.getContext('2d')

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      // if (ImageRef.current.src) {
      //   context.drawImage(ImageRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
      // }

      viewRef.current.forEach(i => {
        const x = i.x
        const y = i.y
        const radius = i.radius

        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(0, 0, 0, 1)'
        context.fill()

        i.radius = i.radius - 1

        if (i.radius === 0) viewRef.current = viewRef.current.filter(i_ => i_ !== i)
      })


      loop()
    })
  }

  React.useEffect(() => {
    loop()
  }, [])

  React.useEffect(() => {
    fetch(`https://picsum.photos/800/800`)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.onload = (event) => ImageRef.current.src = event.target.result
        reader.readAsDataURL(blob)
      })
  }, [])

  React.useEffect(() => {
    if (Imitation.state.times === 0) return

    const radius = Math.ceil(Math.random() * 50) + 25
    const x = Math.ceil(Math.random() * (canvasRef.current.width - radius) + radius)
    const y = Math.ceil(Math.random() * (canvasRef.current.height - radius) + radius)

    const view = { x, y, radius }

    viewRef.current.push(view)

    Imitation.assignState({ times: Imitation.state.times - 1 })
  }, [Imitation.state.times])

  return <canvas style={{ position: 'absolute', zIndex: -1, top: 0, left: 0, width: '100%', height: '100%' }} width={canvasRef.current ? canvasRef.current.offsetWidth : 0} height={canvasRef.current ? canvasRef.current.offsetHeight : 0} ref={el => canvasRef.current = el}></canvas>
}

export default Imitation.withBindRender(App, state => [state.times])