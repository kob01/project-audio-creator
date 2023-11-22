const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const dist = 'ClassicalChoirMale'

const distDir = path.resolve(__dirname, './' + dist)

const distDirResult = fs.readdirSync(distDir)

const renameFile = () => {
  distDirResult.forEach(i => {
    if (i.includes('.js')) return
    if (i.includes('.DS')) return
    const old_ = path.resolve(__dirname, './' + dist + '/' + i)
    const new_ = path.resolve(__dirname, './' + dist + '/' + i.replaceAll(' ', '_'))
    fs.renameSync(old_, new_)
  })
}

const getImport = () => {
  var result = []

  distDirResult.forEach(i => {
    if (i.includes('.js')) return
    if (i.includes('.DS')) return
    result.push(`import Audio_${i.split('.')[0]} from "./${i}"`)
  })

  result = result.join('\n')

  console.log(result)
}

const getSourceFile = () => {
  var result = []

  distDirResult.forEach(i => {
    if (i.includes('.js')) return
    if (i.includes('.DS')) return
    var name = i
    name = name.replace(/\..+/, '')
    name = name.split('_')[name.split('_').length - 2][0] + '.' + name.split('_')[name.split('_').length - 1]
    name = name.toLocaleUpperCase()
    result.push(`{ name: "${name}", src: Audio_${i.split('.')[0]} },`)

  })

  result = result.join('\n')

  console.log(result)
}

const getSourceSort = () => {
  var result = []

  distDirResult.forEach(i => {
    if (i.includes('.js')) return
    if (i.includes('.DS')) return
    var name = i
    name = name.replace(/\..+/, '')
    name = name.split('_')[name.split('_').length - 2][0] + '.' + name.split('_')[name.split('_').length - 1]
    name = name.toLocaleUpperCase()
    result.push(name)
  })

  result = result.sort()

  result = JSON.stringify(result)

  console.log(result)
}

const prase = () => {
  distDirResult.forEach(i => {
    if (i.includes('.js')) return
    if (i.includes('.DS')) return

    const input = path.resolve(__dirname, './' + dist + '/' + i)
    const output = input.replace('.aif', '.wav')

    new Promise(r => {
      exec(`ffmpeg -i ${input} ${output}`, r);
    })
  })
}

// getSourceFile()
getSourceSort()