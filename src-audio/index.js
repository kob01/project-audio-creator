import PianoV1 from './PianoV1/index'
import BassoonStacF1 from './BassoonStacF1/index'
import ClassicalChoirFemale from './ClassicalChoirFemale/index'
import ClassicalChoirMale from './ClassicalChoirMale/index'

PianoV1.forEach(i => i._id = 'PianoV1')

BassoonStacF1.forEach(i => i._id = 'BassoonStacF1')

ClassicalChoirFemale.forEach(i => i._id = 'ClassicalChoirFemale')

ClassicalChoirMale.forEach(i => i._id = 'ClassicalChoirMale')

const source = [...PianoV1, ...BassoonStacF1, ...ClassicalChoirFemale, ...ClassicalChoirMale]

source.forEach(i => i.id = i._id + '.' + i.name)

const defaultSetting = { codeInclued: [], codeExclude: [], codeMain: [], use: true, volume: 1, when: 0, offset: 0, rate: 1 }

const result = source.map(i => Object.assign({}, defaultSetting, i))

export default result