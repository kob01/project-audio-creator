import SimplePiano from './SimplePiano/index'
import BassoonStacF1 from './BassoonStacF1/index'

SimplePiano.forEach(i => i._id = 'SimplePiano')

BassoonStacF1.forEach(i => i._id = 'BassoonStacF1')

const defaultSetting = { use: true, volume: 1, when: 0, offset: 0, rate: 1 }

const source = [...SimplePiano, ...BassoonStacF1]

source.forEach(i => i.id = i._id + '.' + i.name)

const result = source.map(i => Object.assign({}, defaultSetting, i))

export default result