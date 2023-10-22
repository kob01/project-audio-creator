const hash = (n = 16, l = 1) => {
  return new Array(l).fill(undefined).map(i => Array.from(Array(n), () => Math.floor(Math.random() * 36).toString(36)).join('')).join('-').toUpperCase()
}

const includesArray = (a, b) => {
  return !a.some(i => !b.includes(i))
}

export { hash, includesArray }
