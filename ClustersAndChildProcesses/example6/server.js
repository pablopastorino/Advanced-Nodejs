const http = require('http')
const { worker } = require('cluster')
const { pid } = process

http
  .createServer((req, res) => {
    // simulate CPU work
    for (let i = 0; i < 1e7; i++);

    res.end(`Handled by worker ${worker.id} - process ${pid}\n`)
  })
  .listen(8080, () => {
    console.log(`Started worker ${worker.id} - process ${pid}`)
  })

setTimeout(() => {
  process.exit(1)
}, Math.random() * 10000)
