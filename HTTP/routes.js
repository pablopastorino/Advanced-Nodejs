const fs = require('fs')
const http = require('http')
const data = {}

const server = http.createServer()

server.on('request', (req, res) => {
  switch (req.url) {
    case '/api':
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(data))
    case '/home':
    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(fs.readFileSync(`.${req.url}.html`))
      break
    case '/':
      res.writeHead(301, { Location: '/home' })
      res.end()
      break
    default:
      res.writeHead(404)
      res.end()
  }
})

server.listen(8000)

// Request
// curl -i localhost:8000/...
