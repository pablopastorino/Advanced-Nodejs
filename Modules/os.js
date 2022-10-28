const os = require('os')

console.log('devNull :', os.devNull)
console.log('homedir :', os.homedir())
console.log('networkInterfaces :', os.networkInterfaces())
console.log('cpus :', os.type())
console.log('version :', os.version())
console.log('userInfo :', os.userInfo())
console.log('release :', os.release())
console.log('cpus :', os.cpus())
console.log(
  'address :',
  os.networkInterfaces().wlo1.map(i => i.address)
)
console.log('constants :', os.constants)
