const r = [
  { type: 'console', label: '偏爱', value: () => import('./偏爱.console.json').then(res => res.default) },
  { type: 'console', label: '偏爱sp', value: () => import('./偏爱sp.console.json').then(res => res.default) },
]

export default r