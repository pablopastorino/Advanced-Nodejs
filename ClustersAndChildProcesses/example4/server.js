const http = require('http')
const { pid } = process
const { worker } = require('cluster')

let usersCount = 0

http
  .createServer((req, res) => {
    // simulate CPU work

    for (let i = 0; i < 1e7; i++);

    res.write(`Handled by worker ${worker.id} - process ${pid} - users ${usersCount}\n`)
    res.end()
  })
  .listen(8080, () => {
    console.log(`Started worker: ${worker.id} - process ${pid}`)
  })

process.on('message', msg => {
  usersCount = msg
})
