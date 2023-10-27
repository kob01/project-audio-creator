import SimplePiano from './SimplePiano/index'
import BassoonStacF1 from './BassoonStacF1/index'

SimplePiano.forEach(i => i._id = 'SimplePiano')

BassoonStacF1.forEach(i => i._id = 'BassoonStacF1')

const defaultSetting = {
  use: true,
  volume: 1,
  when: undefined,
  offset: undefined,
  duration: undefined
}

const source = [...SimplePiano, ...BassoonStacF1]

source.forEach(i => i.id = i._id + '.' + i.name)

source.forEach(i => Object.assign(i, defaultSetting))

export default source