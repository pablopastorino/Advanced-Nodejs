const http = require('http')
const fs = require('fs')
const path = require('path')
const PORT = process.env.port || 3000

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(path.join(__dirname, 'data.txt'))
  stream.setEncoding('utf8')

  /* --------------------------------- One way -------------------------------- */
  const events = ['resume', 'open', 'ready', 'data', 'end', 'close', 'pause', 'error'] // readable

  events.forEach(e => {
    stream.on(e, chunk => {
      if (e === 'resume') res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })

      if (e === 'data') {
        chunk
          .split('\n')
          .forEach(p => res.write(`<h2 style=text-align:center;color:peru>${p}</h2>`))
      }

      if (e === 'end') res.end('<script>alert("Request ended")</script>')

      console.log(`"${e}" event emitted`)
    })
  })

  /* ------------------------------- Second way ------------------------------- */
  // stream.pipe(res)
})

server.listen(PORT, () => console.log(`Server on port: ${PORT}`))

/* -------------------------------------------------------------------------- */
/*                                    Notes                                   */
/* -------------------------------------------------------------------------- */
// All Readable streams begin in paused mode but can be switched to flowing mode in one of the following ways:

// Adding a 'data' event handler.
// Calling the stream.resume() method.
// Calling the stream.pipe() method to send the data to a Writable.

// The Readable can switch back to paused mode using one of the following:

// If there are no pipe destinations, by calling the stream.pause() method.
// If there are pipe destinations, by removing all pipe destinations. Multiple pipe destinations may be removed by calling the stream.unpipe() method.

// A Readable stream will always emit the 'close' event if it is created with the emitClose option.
