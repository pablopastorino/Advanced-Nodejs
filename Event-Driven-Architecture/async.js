const fs = require('fs')

const readFileAsArray = function (file, cb = () => {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err)
        return cb(err)
      }
      const lines = data.toString().trim().split('\n')
      resolve(lines)
      cb(null, lines)
    })
  })
}

async function countOdd() {
  try {
    const lines = await readFileAsArray('./numbers')
    const numbers = lines.map(Number)
    const oddCount = numbers.filter(n => n % 2).length
    console.log('Odd numbers count: ', oddCount)
  } catch (error) {
    console.error(error)
  }
}

countOdd()
