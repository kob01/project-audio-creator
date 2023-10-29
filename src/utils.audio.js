import Imitation from './utils.imitation'

const AudioContext_ = window.AudioContext || window.webkitAudioContext

const loadAudioBuffer = async (source) => {
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
        const audioContext = new AudioContext_()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        r(audioBuffer)
        audioContext.close()
      })

      source.dataUrl = dataUrl

      source.audioBuffer = audioBuffer

      r()
    })
  }

  if (Array.isArray(source) === true) {
    const promise = source.map(i => parse(i))

    await Promise.all(promise)
  }

  if (Array.isArray(source) === false) {
    await parse(source)
  }

  // source.forEach(i => {
  //   if (i.duration !== i.audioBuffer.duration) console.log(i.name)
  // })

  return source
}

const playAudioBuffer = async (source) => {
  const audioContext = new AudioContext_()

  const gain = audioContext.createGain()
  const bufferSource = audioContext.createBufferSource()

  gain.gain.value = source.volume * Imitation.state.globalSetting.volume

  bufferSource.buffer = source.audioBuffer
  bufferSource.loop = false
  bufferSource.connect(gain).connect(audioContext.destination)

  bufferSource.start(source.when, source.offset, source.duration)

  bufferSource.addEventListener('ended', () => audioContext.close())
}

export { loadAudioBuffer, playAudioBuffer }
