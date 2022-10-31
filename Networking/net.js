const server = require('net').createServer()
let counter = 0
let sockets = {}

function timestamp() {
  const now = new Date()
  return `${now.getHours()}:${now.getMinutes()}`
}

server.on('connection', socket => {
  socket.id = counter++

  socket.write('Please type your name: ')

  socket.on('data', data => {
    if (!sockets[socket.id]) {
      sockets[socket.id] = socket
      socket.name = data.toString().trim()
      socket.write(`Welcome ${socket.name}!\n`)

      console.log(`${socket.name} connected`)

      Object.entries(sockets).forEach(([, cs]) => {
        if (cs.id === socket.id) return
        cs.write(`${socket.name} is connected\n`)
      })

      return
    }

    Object.entries(sockets).forEach(([, cs]) => {
      if (cs.id === socket.id) return
      cs.write(`${socket.name} ${timestamp()}: `)
      cs.write(data)
    })
  })

  socket.on('end', () => {
    Object.entries(sockets).forEach(([, cs]) => {
      if (cs.id !== socket.id) cs.write(`${socket.name} is disconected`)
    })
    delete sockets[socket.id]
    console.log(`${socket.id} disconectd`)
  })
})

server.listen(8000, () => {
  console.log('Server Bound')
})
// nc localhost 8000
// to connect a new web socket
