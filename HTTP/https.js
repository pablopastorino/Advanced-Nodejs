const fs = require('fs')

// Is the http module over tls/ssh
const server = require('https').createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
  // pfx: to combine the two above
})

server.on('request', (req, res) => {
  // req: http.IncomingMessage
  // res: http.ServerResponse

  res.writeHead(200, { 'content-type': 'text/plain' })
  res.write('Holassss\n')
  res.end() // if we don't end the connection will still alive
})

server.timeout = 1000
server.listen(443)
