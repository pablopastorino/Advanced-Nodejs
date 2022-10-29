const cluster = require('cluster')
const os = require('os')

// the first time we start the file we'll be executing this master process (and the isMaster flag will be setted to true)
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  // we will instruct our master process to fork() our srver as many times as we have cpu cores (creating a worker per cpu core)
  const cpus = os.cpus().length

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  require('./server') // theese processes are completely different: each process has it's own event loop and memory space
}
