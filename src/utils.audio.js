import Imitation from './utils.imitation'

const loadAudioBuffer = async (source) => {
  const source_ = JSON.parse(JSON.stringify(source))

  const parse = async (source) => {
    return new Promise(async r => {
      const blob = await fetch(source.src).then(res => res.blob())

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

      const audioBuffer = await new Promise(async r => {
        const audioContext = new AudioContext()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        r(audioBuffer)
        audioContext.close()
      })

      source.dataUrl = dataUrl

      source.audioBuffer = audioBuffer

      r()
    })
  }

  if (Array.isArray(source_) === true) {
    const promise = source_.map(i => parse(i))

    await Promise.all(promise)
  }

  if (Array.isArray(source_) === false) {
    await parse(source_)
  }

  return source_
}

const playAudioBuffer = async (source) => {
  const audioContext = new AudioContext()

  const gain = audioContext.createGain()
  const bufferSource = audioContext.createBufferSource()

  gain.gain.value = source.volume * Imitation.state.setting.volume

  bufferSource.buffer = source.audioBuffer
  bufferSource.loop = false
  bufferSource.connect(gain).connect(audioContext.destination)
  bufferSource.start(0)

  bufferSource.addEventListener('ended', () => audioContext.close())
}

export { loadAudioBuffer, playAudioBuffer }
