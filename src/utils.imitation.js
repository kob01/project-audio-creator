import Imitation from 'imitation-imm/src/index'

const ImitationINS = new Imitation()

ImitationINS.state = {
  loading: 0,

  message: '',

  times: 0,

  setting: { volume: 1 }
}

export default ImitationINS