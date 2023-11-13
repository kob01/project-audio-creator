import PianoV1 from './PianoV1/index'
import BassoonStacF1 from './BassoonStacF1/index'

PianoV1.forEach(i => i._id = 'PianoV1')

BassoonStacF1.forEach(i => i._id = 'BassoonStacF1')

const defaultSetting = { codeInclued: [], codeExclude: [], codeMain: [], use: true, volume: 1, when: 0, offset: 0, rate: 1 }

const source = [...PianoV1, ...BassoonStacF1]

source.forEach(i => i.id = i._id + '.' + i.name)

const result = source.map(i => Object.assign({}, defaultSetting, i))

export default result