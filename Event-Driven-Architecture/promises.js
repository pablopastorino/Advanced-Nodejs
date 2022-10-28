// Promises allow us to handle errors and avoid nesting funcitons
// This code will work in both ways: callbacks and promises
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

// Example call
readFileAsArray('./numbers')
  .then(lines => {
    const numbers = lines.map(Number)
    const oddNumbers = numbers.filter(n => n % 2)
    console.log('Odd numbers count: ', oddNumbers.length)
  })
  .catch(console.error)
