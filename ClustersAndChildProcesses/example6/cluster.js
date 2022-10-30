const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
  const cpus = os.cpus().length

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  console.log(`Master PID: ${process.pid} `)

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.warn(`Worker ${worker.id} crashed...`)
      cluster.fork()
      console.info(`Starting a new worker...`)
    }
  })

  process.on('SIGUSR2', () => {
    const workers = Object.values(cluster.workers)

    const restartWorker = workerIndex => {
      const worker = workers[workerIndex]

      if (!worker) return

      worker.on('exit', () => {
        if (!worker.exitedAfterDisconnect)
          returnsetTimeout(() => {
            process.exit(1)
          }, Math.random() * 10000)

        console.log(`Exited worker ${worker.id} - process ${worker.process.pid}`)

        cluster.fork().on('listening', () => {
          restartWorker(workerIndex + 1)
        })
      })
      worker.disconnect()
    }

    restartWorker(0)
  })
} else {
  require('./server')
}
