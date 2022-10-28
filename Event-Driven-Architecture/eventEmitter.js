const EventEmitter = require('events')
const fs = require('fs')

/* -------------------------------- Example 1 ------------------------------- */

// class Logger extends EventEmitter {}
// const logger = new Logger()

// // First register a listener for the event
// logger.on('event', listenerFunction)
// // Then emit the event
// logger.emit('event')

/* -------------------------------- Example 2 ------------------------------- */
// Synchronous Events Execution (events doesn't mean synchronous or asynchronous)

// class WithLog extends EventEmitter {
//   execute(taskFunc) {
//     console.log('Before Executing')
//     this.emit('begin')
//     taskFunc()
//     this.emit('end')
//     console.log('After Executing')
//   }
// }

// const withLog = new WithLog()

// withLog.on('begin', () => {
//   console.log('About to Execute')
// })

// withLog.on('end', () => {
//   console.log('Done Executing')
// })

// withLog.execute(() => {
//   console.log('*** Execute Task ***')
// })

/* -------------------------------- Example 3 ------------------------------- */
// Asynchronous Events Execution

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time('execute')

    this.emit('begin')

    asyncFunc(...args, (err, data) => {
      if (err) return this.emit('error', err)

      this.emit('data', data)
      this.emit('end')

      console.timeEnd('execute')
    })
  }
}

const withTime = new WithTime()

withTime.on('begin', () => {
  console.log('About to Begin')
})

withTime.on('data', data => {
  console.log('Data Length: ', data.length) // Events can be called with an argument
})

withTime.prependListener('data', data => {
  // Will execute first
  console.log('Data Characters: ', data.toString().length) // Second Listener
})

withTime.on('end', () => {
  console.log('Done With Execute')
})

withTime.removeListener('data', () => {
  console.log('Listener "data" removed')
})

withTime.on('error', console.error) // Listening for erros

console.log('eventNames: ', withTime.eventNames()) // Array of the events for which the emitter has registered events

process.once('uncaughtException', err => {
  // To run only once (not 'on')
  console.log(err)
  // do some cleanup
  process.exit(1)
})

withTime.execute(fs.readFile, __filename)

// The error event does not has a listener (makes the program to exit)
// 'Unhandled Error Event'
withTime.execute(fs.readFile, '')
