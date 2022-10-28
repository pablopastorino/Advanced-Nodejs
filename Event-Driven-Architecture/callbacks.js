// Callbacks are functions that are passed to other functions
// Because in JS Functions are first class citizens

// Callbacks !== Asynchrony
// Callbacks can be called synchronously or asynchronously
// The callback has an 'error first' parameter that is nullable

const fs = require('fs')

const readFileAsArray = function (file, cb) {
  fs.readFileSync(file, (err, data) => {
    if (err) return cb(err)

    const lines = data.toString().trim().split('\n')

    cb(null, lines)
  })
}

// Example call
readFileAsArray(__dirname + '/numbers', (err, lines) => {
  if (err) throw Error(err.message)

  const numbers = lines.map(Number)

  const oddNumbers = numbers.filter(n => n % 2)

  console.log('Odd numbers count: ', oddNumbers.length)
})
