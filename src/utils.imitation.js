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

  canvasAnimation: 0,

  navigationDrawer: false,

  dragTarget: null,

  audio: audio,

  audioSetting: [],

  globalSetting: { volume: 1, scale: 1 },

  consoleExpand: true,

  console: [],

  consoleCurrent: null,

  dialogGlobalSetting: null,

  dialogAudioSetting: null,

  dialogConsoleAudioSetting: null
}

export default ImitationINS