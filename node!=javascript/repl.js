const repl = require('repl')

let r = repl.start({
  ignoreUndefined: true,
  replMode: repl.REPL_MODE_STRICT
})

// r.context.lodash = require('lodash')

/* -------------------------- Node commands options ------------------------- */
// -c // to avoid bad syntax
// -p // evaluates a string and prints the result just like repl
// -r // preload some modules before executing the code
