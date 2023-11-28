import Imitation from './utils.imitation'

const AudioContext_ = window.AudioContext || window.webkitAudioContext

const loadAudioBuffer = async (source) => {
  const parse = async (source) => {
    return new Promise(async r => {
      if (source.audioBuffer !== undefined) { r(source); return; }

      const blob = await fetch(source.src).then(res => res.blob())

      // const dataUrl = await new Promise(r => {
      //   const reader = new FileReader()
      //   reader.onload = (event) => r(event.target.result)
      //   reader.readAsDataURL(blob)
      // })

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

      source.audioBuffer = audioBuffer

      r(source)
    })
  }

  var r

  if (Array.isArray(source) === true) {
    const promise = source.map(i => parse(i))

    r = await Promise.all(promise)
  }

  if (Array.isArray(source) === false) {
    r = await parse(source)
  }

  return r
}

const parseAudioContextSingle = (source) => {
  const audioContext = new AudioContext_()

  const gain = audioContext.createGain()
  const bufferSource = audioContext.createBufferSource()

  gain.gain.value = source.volume * Imitation.state.globalSetting.volume

  bufferSource.buffer = source.audioBuffer
  bufferSource.loop = false
  bufferSource.playbackRate.value = source.rate

  bufferSource.connect(gain).connect(audioContext.destination)

  return { source, bufferSource, gain, audioContext }
}

const parseAudioContextMultiple = (source) => {
  const audioContext = new AudioContext_()

  const sources = []

  source.forEach(i => {
    const source = i

    const gain = audioContext.createGain()
    const bufferSource = audioContext.createBufferSource()

    gain.gain.value = source.volume * Imitation.state.globalSetting.volume

    bufferSource.buffer = source.audioBuffer
    bufferSource.loop = false
    bufferSource.playbackRate.value = source.rate

    bufferSource.connect(gain).connect(audioContext.destination)

    sources.push({ source: i, bufferSource, gain })
  })

  return { audioContext, sources }
}

const playAudioContext = (source) => {
  const audioContext = new AudioContext_()

  const gain = audioContext.createGain()
  const bufferSource = audioContext.createBufferSource()

  gain.gain.value = source.volume * Imitation.state.globalSetting.volume

  // gain.gain.linearRampToValueAtTime()

  bufferSource.buffer = source.audioBuffer
  bufferSource.loop = false
  bufferSource.playbackRate.value = source.rate

  bufferSource.connect(gain).connect(audioContext.destination)

  bufferSource.start(source.when, source.offset, source.duration)

  bufferSource.addEventListener('ended', () => audioContext.close())
}

const analyseAudioContext = (source) => {
  const audioContext = new AudioContext_()

  const bufferSource = audioContext.createBufferSource()

  const analyser = audioContext.createAnalyser()

  bufferSource.buffer = source.audioBuffer

  bufferSource.connect(analyser)
  analyser.connect(audioContext.destination)

  const bufferLength = analyser.frequencyBinCount

  const dataArray = new Uint8Array(bufferLength)

  analyser.getByteFrequencyData(dataArray)

  return dataArray
}

export { loadAudioBuffer, parseAudioContextSingle, parseAudioContextMultiple, playAudioContext }
