import React from 'react'

import Imitation from './utils.imitation'

function App() {

  const [views, setViews] = React.useState([])

  React.useEffect(() => {
    if (Imitation.state.times === 0) return

    const view = {}

    setViews(pre => [...pre.filter(i => i.end === false), view])
    
  }, [Imitation.state.times])

  return <div style={{ position: 'fixed', zIndex: -1, top: 0, left: 0, width: '100%', height: '100%' }}>

  </div>
}

export default Imitation.withBindRender(App, state => [state.times])