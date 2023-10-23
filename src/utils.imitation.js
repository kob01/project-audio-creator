import audio from '../audio/index'

import Imitation from 'imitation-imm/src/index'

const ImitationINS = new Imitation()

ImitationINS.state = {
  loading: 0,

  message: '',

  times: 0,

  audio: audio,

  setting: { volume: 1 },

  dialogGlobalSetting: false,

  dialogCurrentAudioSetting: false,

  currentAudio: null
}

export default ImitationINS