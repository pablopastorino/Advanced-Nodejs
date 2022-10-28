const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.write('Holassss\n')
  res.end() // if we don't end the connection will still alive
})

server.timeout = 1000
server.listen(8000)

// curl -i localhost:8000
// if we don't terminate with a res.end() the connection will still alive
// we have to do it for every request (is not optional)

const { logProperties } = require('../helpers/helper')
logProperties(server)
