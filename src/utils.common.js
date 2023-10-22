const hash = (n = 16, l = 1) => {
  return new Array(l).fill(undefined).map(i => Array.from(Array(n), () => Math.floor(Math.random() * 36).toString(36)).join('')).join('-').toUpperCase()
}

const base64Audio = (audioFile, callback) => {
  var reader = new FileReader()
  reader.readAsDataURL(audioFile)
  reader.onload = () => {
    callback(reader.result)
  }
}

const includesArray = (a, b) => {
  return !a.some(i => !b.includes(i))
}

const loadAudioBuffer = async (source) => {
  const source_ = JSON.parse(JSON.stringify(source))

  const promise = source_.map(i => {
    return new Promise(async r => {
      const blob = await fetch(i.src).then(res => res.blob())

      const dataUrl = await new Promise(r => {
        const reader = new FileReader()
        reader.onload = (event) => r(event.target.result)
        reader.readAsDataURL(blob)
      })

      const arrayBuffer = await new Promise(r => {
        const reader = new FileReader()
        reader.onload = (event) => r(event.target.result)
        reader.readAsArrayBuffer(blob)
      })

      const audioBuffer = await new Promise(r => {
        const audioContext = new AudioContext();
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => r(audioBuffer))
      })

      i.dataUrl = dataUrl

      i.arrayBuffer = arrayBuffer

      i.audioBuffer = audioBuffer

      r()
    })
  })

  await Promise.all(promise)

  return source_
}

const playAudioBuffer = (source) => {
  // const audioInstance = new Audio(source.dataUrl)
  // audioInstance.play()

  const audioContext = new AudioContext()
  const audioSource = audioContext.createBufferSource()

  audioSource.buffer = source.audioBuffer
  audioSource.loop = false
  audioSource.connect(audioContext.destination)
  audioSource.start(0)
}

export { hash, base64Audio, includesArray, loadAudioBuffer, playAudioBuffer }
