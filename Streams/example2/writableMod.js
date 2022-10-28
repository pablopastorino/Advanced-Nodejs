const http = require('http')
const fs = require('fs')
const path = require('path')
const PORT = process.env.port || 3000

const server = http.createServer((req, res) => {
  const writable = fs.createWriteStream(path.join(__dirname, 'server.txt'))

  if (req.method == 'POST') {
    const events = ['data', 'end', 'close'] // 'pipe', 'unpipe'

    events.forEach(e => {
      req.on(e, chunk => {
        if (e === 'data') {
          const dataObj = JSON.parse(chunk)
          writable.write(dataObj.data)
        }

        if (e === 'end') {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end('Data received')
        }

        console.log(`"${e}" event emitted`)
      })
    })
  }
})
server.listen(PORT, () => console.log(`Server on port: ${PORT}`))
