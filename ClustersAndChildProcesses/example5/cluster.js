const cluster = require('cluster')
const os = require('os')

/* ------------------------------ Mock DB Call ------------------------------ */
const numberOfUsersInDb = function () {
  this.count = this.count || 5
  this.count *= this.count
  return this.count
}

if (cluster.isMaster) {
  const cpus = os.cpus().length

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  const updateWorkers = () => {
    const usersCount = numberOfUsersInDb()
    Object.values(cluster.workers).forEach(worker => worker.send(usersCount))
  }

  setInterval(() => updateWorkers(), 10000)

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed...`)
      cluster.fork()
      console.log(`Starting a new worker...`)
    }
  })
} else {
  require('./server')
}
