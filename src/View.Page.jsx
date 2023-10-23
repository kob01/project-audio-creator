import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Imitation from './utils.imitation'

const Default = React.lazy(() => import('./View.Page.Default'))
const SimplePiano = React.lazy(() => import('./View.Page.SimplePiano'))
const BassoonStacF1 = React.lazy(() => import('./View.Page.BassoonStacF1'))

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
      <Route path={'/SimplePiano'} exact><React.Suspense fallback={<SuspenseLoading />} children={<SimplePiano />} /></Route>
      <Route path={'/BassoonStacF1'} exact><React.Suspense fallback={<SuspenseLoading />} children={<BassoonStacF1 />} /></Route>
    </Switch>
  </>
}

export default App