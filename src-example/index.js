const r = [
  { type: 'console', label: '偏爱', value: () => import('./偏爱.console.json').then(res => res.default) },
  { type: 'console', label: 'void', value: () => import('./void.console.json').then(res => res.default) },
]

export default r