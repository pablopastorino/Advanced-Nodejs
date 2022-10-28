const dns = require('dns')
// Is used to translate network names to addresses
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

let addr, domain

readline.question('Hostname: ', input => {
  domain = input
})

dns.lookup(domain, (err, address) => {
  console.log('Address (dns.lookup): ', address)
  addr = address
})
// This method does not use netkork communication. Instead use the system facilities (libuv)
// All other methods in the dns module, use the network directly

dns.resolve4(domain, (err, address) => {
  console.log('Address (dns.resolve4): ', address)
})

dns.resolve(domain, 'MX', (err, address) => {
  // Default second parameter is A
  console.log('Address (dns.resolveMx): ', address)
})

// Other way
// dns.resolveMx(domain, (err, address) => {
//   // Default second parameter is A
//   console.log(address)
// })

dns.reverse(addr, (err, hostName) => {
  console.log(hostName)
})
