const { fork } = require('child_process')
const http = require('http')

// To speed up the response time, the solution is to move this computation to another file
// and comunicate with it using fork()
// const longComputation = () => {
//   let sum = 0
//   for (let i = 0; i < 1e9; i++) {
//     sum += 1
//   }
//   return sum
// }

const server = http.createServer()

server.on('request', (req, res) => {
  if (req.url === '/compute') {
    // const sum = longComputation()
    // return res.end(JSON.stringify(sum))
    const compute = fork('compute.js')
    compute.send('start')
    compute.on('message', console.log)
  } else {
    res.end('Ok')
  }
})

server.listen(3000)
