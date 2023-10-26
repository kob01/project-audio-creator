import audio from '../src-audio/index'

import Imitation from 'imitation-imm/src/index'

const ImitationINS = new Imitation()

ImitationINS.state = {
  loading: 0,

  message: '',

  times: 0,

  audio: audio,

  audioSetting: [],

  globalSetting: { volume: 1, scale: 1 },

  dialogGlobalSetting: false,

  dialogAudioMultipleSetting: false,

  audioMultipleSetting: '',

  dialogAudioSingleSetting: false,

  audioSingleSetting: '',
}

export default ImitationINS