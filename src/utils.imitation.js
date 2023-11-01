import audio from '../src-audio/index'

import Imitation from 'imitation-imm/src/index'

const ImitationINS = new Imitation()

ImitationINS.state = {
  theme: {
    palette: {
      primary: {
        main: '#000000',
      }
    }
  },

  loading: 0,

  message: '',

  canvasTimes: 0,

  navigationDrawer: false,

  consoleExpand: false,

  audio: audio,

  audioSetting: [],

  globalSetting: { volume: 1, scale: 1 },

  dialogGlobalSetting: null,

  dialogAudioSetting: null,
}

export default ImitationINS