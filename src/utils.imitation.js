import audio from '../src-audio/index'

import Imitation from 'imitation-imm/src/index'

// import example from '../src-example/偏爱.console.json'

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

  globalSetting: { volume: 1, scale: 1 },

  console: [],
  // console: example.console,

  consoleExpand: false,

  consoleCurrent: null,

  consoleContainerRef: null,

  consoleFullScreen: false,

  dialogGlobalSetting: null,

  dialogPlaygroundAudio: null,

  dialogConsoleTimeAlignment: null,
  
  dialogConsoleAudio: null,
  
  dialogConsoleGroup: null,

  dialogExample: null,

  dialogLocalStorage: null,
}

export default ImitationINS