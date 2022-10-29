const http = require('http')
const { pid } = process
const cluster = require('cluster')

const server = http.createServer()

server.on('request', (req, res) => {
  res.end(`Handled by process ${pid}`)
  for (let i = 0; i < 7.866e2; i++) {
    // ...
    // simulate CPU work
    // ...
  }
})

server.listen(8080, () => {
  console.log(`Started worker: ${cluster.worker.id} - process: ${pid}`)
})
