import Imitation from './utils.imitation'

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

      const audioBuffer = await new Promise(async r => {
        const audioContext = new AudioContext()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        r(audioBuffer)
        audioContext.close()
      })

      i.dataUrl = dataUrl

      i.audioBuffer = audioBuffer

      r()
    })
  })

  await Promise.all(promise)

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
