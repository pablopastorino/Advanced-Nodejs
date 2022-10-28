// global.variable = ... avoid doing this. Will be available for all modules that require this

// Important Global Objects
// Process: provides a bridge between a node application and its running environment
// It is also an event emitter
// process.env
// process.relseas.lts
// Comunicate with the environment:
// process.stdin - process.stdout - process.stderr (predef streams)

process.on('exit', code => {
  // only final synchronous code inside here
  // before node process terminates

  console.log(`About to exit with code: ${code}`)
})

process.on('uncaughtException', err => {
  // something went unhaldled
  // do any cleanup and exit anyway

  console.error(err) // don't do just that
  process.exit(1) // FORCE exit the process too
})

process.stdin.resume() // to keep the event loop busy

console.dog() // triggers a TypeError exception

// Buffer
// Is a chunk of memory allocated outside the V8 heap (eg: files or sockets)
// Lower level data type that represents a sequence of bynary data
// That data can be interpreted in many ways
// There is a buffer -> there is a character enconding
// Because buffers that not have encoding, so to read a buffer we must provide one (otherway we get a buffer object)
// Is used heavily in Node to work with binary streams of data
