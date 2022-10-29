const { fork } = require('child_process')
const http = require('http')
const path = require('path')

// To speed up the response time, the solution is to move this computation to another file
// and comunicate with it using fork()
// Then the server will be able to handle other requests

const server = http.createServer()

server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const compute = fork(path.join(__dirname, 'compute.js'))

    compute.send('start')

    compute.on('message', msg => {
      if (msg === 'progress') process.stdout.write(': ')
      else if (msg === 'done') process.stdout.write('\n')
      else console.log(msg)
    })
  } else {
    res.end('Ok')
  }
})

server.listen(3000)
