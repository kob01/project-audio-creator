import audio from '../audio/index'

import Imitation from 'imitation-imm/src/index'

const ImitationINS = new Imitation()

ImitationINS.state = {
  loading: 0,

  message: '',

  times: 0,

  audio: audio,

  audioSetting: [],

  setting: { volume: 1 },

  dialogGlobalSetting: false,

  dialogAudioMultipleSetting: false,

  audioMultipleSetting: '',

  dialogAudioSingleSetting: false,

  audioSingleSetting: '',
}

export default ImitationINS