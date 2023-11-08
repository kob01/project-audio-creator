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

  message: null,

  useCanvasAnimation: true,

  canvasAnimation: 0,

  navigationDrawerExpand: false,

  dragTarget: null,

  audio: audio,

  audioSetting: [],

  globalSetting: { volume: 0, scale: 1 },

  console: [],

  consoleExpand: false,

  consoleCurrent: null,

  consoleContainerRef: null,

  consoleFullScreen: false,

  dialogGlobalSetting: null,

  dialogConsoleRename: null,

  dialogTimeAlignment: null,
  
  dialogAudioSetting: null,

  dialogConsoleAudioSetting: null
}

export default ImitationINS