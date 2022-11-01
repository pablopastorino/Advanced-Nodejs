const dns = require('dns')
// Is used to translate network names to addresses

let domain = process.argv[2]

/* --------------------------------- Lookup --------------------------------- */
dns.lookup(domain, (err, address, family) => {
  console.log('dns.lookup(): address: %j - family: IPv%s', address, family)
})

// This method does not use netkork communication. Instead use the system facilities (libuv)
// All other methods in the dns module, use the network directly

/* -------------------------------- Resolve4 -------------------------------- */
// dns.resolve4(domain, (err, address) => {
//   console.log('dns.resolve4(): address: %j', address)
// })

// Uses the DNS protocol to resolve a IPv4 addresses
// The addresses argument passed to the callback function will contain an array of IPv4 addresses

/* --------------------------------- Resolve -------------------------------- */
// dns.resolve(domain, 'MX', (err, address, family) => {
//   // Default second parameter is A
//   console.log('Address (dns.resolveMx): ', address)
// })

const resolveTypes = [
  {
    rrtype: 'A',
    records: 'IPv4 addresses',
    result: 'string',
    shorthandMethod: 'resolve4'
  },
  {
    rrtype: 'AAAA',
    records: 'IPv6 addresses',
    result: 'string',
    shorthandMethod: 'resolve6'
  },
  {
    rrtype: 'ANY',
    records: 'any records',
    result: 'object',
    shorthandMethod: 'resolveAny'
  },
  {
    rrtype: 'CAA',
    records: 'CA authorization',
    result: 'object',
    shorthandMethod: 'resolveCaa'
  },
  {
    rrtype: 'CNAME',
    records: 'canonical name ',
    result: 'string',
    shorthandMethod: 'resolveCname'
  },
  {
    rrtype: 'MX',
    records: 'mail exchange',
    result: 'object',
    shorthandMethod: 'resolveMx'
  },
  {
    rrtype: 'NAPTR',
    records: 'name authority pointer',
    result: 'object',
    shorthandMethod: 'resolveNaptr'
  },
  {
    rrtype: 'NS',
    records: 'name server',
    result: 'string',
    shorthandMethod: 'resolveNs'
  },
  {
    rrtype: 'PTR',
    records: 'pointer',
    result: 'string',
    shorthandMethod: 'resolvePtr'
  },
  {
    rrtype: 'SOA',
    records: 'start of authority',
    result: 'object',
    shorthandMethod: 'resolveSoa'
  },
  {
    rrtype: 'SRV',
    records: 'service',
    result: 'object',
    shorthandMethod: 'resolveSrv'
  },
  {
    rrtype: 'TXT',
    records: 'text',
    result: 'array',
    shorthandMethod: 'resolveTxt'
  }
]

resolveTypes.forEach(type => {
  dns.resolve(domain, type.rrtype, (err, res) => {
    console.log(
      `rrtype: ${type.rrtype} records: ${type.records} result: ${
        typeof res === 'object' ? JSON.stringify(res, null, 4) : res
      }`
    )
  })
})

// Other way
// dns.resolveMx(domain, (err, address) => {
//   // Default second parameter is A
//   console.log(address)
// })

// dns.reverse(addr, (err, hostName) => {
//   console.log(hostName)
// })
