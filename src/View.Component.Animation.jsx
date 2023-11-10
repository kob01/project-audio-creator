import React from 'react'

function App(props) {
  const { tag = 'div', animation, restore, ref_, ...params } = props

  const ref = React.useRef()

  const [style, setStyle] = React.useState(animation[0])

  React.useEffect(() => {
    const option = {
      threshold: [0, 0.01, 0.02, 0.03]
    }

    const intersectionObserver = new IntersectionObserver(en => {
      if (en[0].intersectionRatio > 0) setStyle(animation[1])
      if (restore && en[0].intersectionRatio === 0) setStyle(animation[0])
    }, option)

    intersectionObserver.observe(ref.current)

    return () => intersectionObserver.disconnect()
  }, [JSON.stringify(props.animation)])

  return React.createElement(tag, { ...params, style: { ...params.style, ...style }, ref: el => { ref.current = el; if (ref_) ref_(el) } })
}

export default App