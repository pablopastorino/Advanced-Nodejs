const dgram = require('dgram')
const PORT = 3353
const HOST = '127.0.0.1'

/* --------------------------------- Server --------------------------------- */
const server = dgram.createSocket('udp4')

server.on('listening', () => {
  console.log('Udp Server Listening')
})

server.on('message', (msg, rinfo) => {
  console.log(`${rinfo.address}:${rinfo.port} - ${msg}`)
})

server.bind(PORT, HOST)

/* --------------------------------- Client --------------------------------- */
const client = dgram.createSocket('udp4')

const message = 'Pluralsight rocks' // We can send a string
const msg = Buffer.from(message) // Or a buffer (also can specify the buffer start and end)

client.send(msg, 0, msg.length, PORT, HOST, err => {
  if (err) throw err

  console.log('UDP message sent')

  client.close()
})

// Every time we create a new socket it will use a different port
