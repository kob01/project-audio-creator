import React from 'react'

import Imitation from './utils.imitation'

function App() {
  const canvasRef = React.useRef()

  const ImageRef = React.useRef(new Image())

  const viewRef = React.useRef([])

  const loop = () => {
    if (Imitation.state.useCanvasAnimation === false) return

    requestAnimationFrame(() => {
      const context = canvasRef.current.getContext('2d')

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      viewRef.current.forEach(i => {
        const x = i.x
        const y = i.y
        const radius = i.radius

        context.save()

        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.clip()

        // context.drawImage(ImageRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        context.fillStyle = Imitation.state.theme.palette.primary.main
        context.fill()

        context.restore()

        i.radius = i.radius - i.radiusMax / 120

        if (i.radius === 0 || i.radius < 0.1) viewRef.current = viewRef.current.filter(i_ => i_ !== i)
      })

      loop()
    })
  }

  React.useEffect(() => {
    if (Imitation.state.useCanvasAnimation === true) {
      loop()
    }
  }, [Imitation.state.useCanvasAnimation])

  React.useEffect(() => {
    fetch(`https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0f5476c4-c3f9-4dfc-97ff-81df8bcc4572%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1701858544&t=592cf9be04636c20ef54e1bf18707088`)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.onload = (event) => ImageRef.current.src = event.target.result
        reader.readAsDataURL(blob)
      })
  }, [])

  React.useEffect(() => {
    if (Imitation.state.canvasAnimation === 0 || Imitation.state.useCanvasAnimation === false) return

    const min = Math.min(canvasRef.current.width, canvasRef.current.height)

    const radius = Math.random() * min * 0.2 + min * 0.1
    const radiusMax = radius
    const x = Math.random() * (canvasRef.current.width - radius) + radius / 2
    const y = Math.random() * (canvasRef.current.height - radius) + radius / 2

    const view = { x, y, radius, radiusMax }

    viewRef.current.push(view)
  }, [Imitation.state.canvasAnimation])

  return <canvas style={{ position: 'absolute', zIndex: -1, top: 0, left: 0, width: '100%', height: '100%' }} width={canvasRef.current ? canvasRef.current.offsetWidth : 0} height={canvasRef.current ? canvasRef.current.offsetHeight : 0} ref={el => canvasRef.current = el}></canvas>
}

export default Imitation.withBindRender(App, state => [state.canvasAnimation, JSON.stringify(state.theme)])