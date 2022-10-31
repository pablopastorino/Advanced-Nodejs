// there is a Console class and also a console method of the global object
const fs = require('fs')
const util = require('util')
const path = require('path')

const out = fs.createWriteStream(path.join(__dirname, 'logs', 'out.log'))
const err = fs.createWriteStream(path.join(__dirname, 'logs', 'err.log'))

const logger = new console.Console(out, err)

/* ------------------------------ Log and Error ----------------------------- */
setInterval(function () {
  logger.log(new Date())
  logger.error(new Error('Woops'))
}, 5000)

// console.log uses the util module to format
console.log('One %s', 'thing')
util.format('One %s', 'thing') // but won't log it
// also can be %j to format to json
console.log('JSON %j', { key: 'value', other: 'value', number: 15 })

util.inspect({ key: 'value' }) // is used when console.log objects equals to console.dir

/* ----------------------------------- Dir ---------------------------------- */
console.dir(global, { depth: 1 })

/* --------------------------------- Assert --------------------------------- */
console.assert(true == 1, "This won't be written")
console.assert(true == 0, 'This will ber written, because the assertion is false')

/* ---------------------------------- Trace --------------------------------- */
console.trace('here')

/* ---------------------------------- Time ---------------------------------- */
console.time('labelForTime')
console.timeEnd('labelForTime')

/* ---------------------------------- Debug --------------------------------- */
// To write messages to the stderr conditionly based on the existence on the node debug environment variable
const debuglog = util.debuglog('web')
const req = {
  url: 'localhost:8000'
}

debuglog('HTTP Request %s', req.url)

/* ----------------------------- util.deprecate ----------------------------- */
// Is used to export functions (wrapped in it) to indicate as deprecated
