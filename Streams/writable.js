const stream = require('stream')

const outStream = new stream.Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  }
})

// To consume stream
process.stdin.pipe(outStream)

// Would be similar to:
// process.stdin.pipe(process.stdout)
