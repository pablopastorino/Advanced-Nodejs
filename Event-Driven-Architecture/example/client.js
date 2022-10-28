const EventEmitter = require('events')
const readLine = require('readline')

const rl = readLine.createInterface({
  input: process.stdin,
  out: process.stdout
})

const client = new EventEmitter()
const server = require('./server')(client)

server.on('response', resp => {
  process.stdout.write('\u001b[2J\u001b[0;0f') // clears console
  process.stdout.write(resp)
  process.stdout.write('\n> ')
})

let command, args

rl.on('line', input => {
  ;[command, ...args] = input.split(' ')
  client.emit('command', command, args)
})
