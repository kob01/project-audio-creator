const hash = (n = 16, l = 1) => {
  return new Array(l).fill(undefined).map(i => Array.from(Array(n), () => Math.floor(Math.random() * 36).toString(36)).join('')).join('-').toUpperCase()
}

const includesArray = (a, b) => {
  return !a.some(i => !b.includes(i))
}

const requestIdleCallbackProcess = async (process) => {
  const r = await new Promise(r => {
    const loop = () => {
      requestIdleCallback(async idle => {
        while (idle.timeRemaining() > 2 && process.done === false) await process.next()
        if (process.done === false) loop(r)
        if (process.done === true) r()
      })
    }

    loop()
  })

  return r
}

export { hash, includesArray, requestIdleCallbackProcess }
