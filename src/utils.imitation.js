import audio from '../src-audio/index'

import Imitation from 'imitation-imm/src/index'

import example from '../src-example/偏爱.console.json'

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

  navigationDrawerExpand: false,

  globalSetting: { volume: 1, scale: 1 },

  canvasAnimationUse: true,

  canvasAnimation: [],

  audio: audio,

  audioCustom: [],

  audioSetting: [],

  audioDragTarget: null,

  console: [],
  console: example,

  consoleExpand: true,

  consoleFullScreen: false,

  consoleCurrent: null,

  consoleContainerRef: null,

  consoleRecord: [],

  dialogGlobalSetting: null,

  dialogPlaygroundAudio: null,

  dialogConsoleTimeAlignment: null,

  dialogConsoleAudio: null,

  dialogConsoleGroup: null,

  dialogExample: null,

  dialogLocalStorage: null,
}

export default ImitationINS