const http = require('http')
const pid = process.pid

let usersCount

http
  .createServer((req, res) => {
    // simulate CPU work
    for (let i = 0; i < 1e7; i++);
    res.write(`Handled by process ${pid}\n`)
    res.end(`Users ${usersCount}`)
  })
  .listen(8080, () => {
    console.log(`Started process ${pid}`)
  })

setTimeout(() => {
  process.exit(1)
}, Math.random() * 10000)

process.on('message', msg => {
  usersCount = msg
})
