const cluster = require('cluster')
const os = require('os')

/* ------------------------------ Mock DB Call ------------------------------ */
const numberOfUsersInDb = function () {
  this.count = this.count || 5
  this.count *= this.count
  return this.count
}
/* -------------------------------------------------------------------------- */

if (cluster.isMaster) {
  const cpus = os.cpus().length

  console.log(`Forking for ${cpus} CPUs`)

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  // console.dir(cluster.workers, { depth: 0 })

  const updateWorkers = () => {
    const usersCount = numberOfUsersInDb()
    Object.values(cluster.workers).forEach(worker => worker.send(usersCount))
  }

  setInterval(() => updateWorkers(), 10000)
} else {
  require('./server')
}
