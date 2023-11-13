import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Imitation from './utils.imitation'

const Default = React.lazy(() => import('./View.Page.Default'))
const PianoV1 = React.lazy(() => import('./View.Page.Playground.PianoV1'))
const PianoV1M1 = React.lazy(() => import('./View.Page.Playground.PianoV1M1'))
const BassoonStacF1 = React.lazy(() => import('./View.Page.Playground.BassoonStacF1'))

function SuspenseLoading() {
  React.useEffect(() => {
    Imitation.setState(pre => { pre.loading = pre.loading + 1; return pre })
    return () => {
      Imitation.setState(pre => { pre.loading = pre.loading - 1; return pre })
    }
  }, [])

  return null
}

function App() {
  return <>
    <Switch>
      <Route path={'/'} exact><React.Suspense fallback={<SuspenseLoading />} children={<Default />} /></Route>
      <Route path={'/PianoV1'} exact><React.Suspense fallback={<SuspenseLoading />} children={<PianoV1 />} /></Route>
      <Route path={'/PianoV1M1'} exact><React.Suspense fallback={<SuspenseLoading />} children={<PianoV1M1 />} /></Route>
      <Route path={'/BassoonStacF1'} exact><React.Suspense fallback={<SuspenseLoading />} children={<BassoonStacF1 />} /></Route>
    </Switch>
  </>
}

export default App