// exports is equals to
// exports = module.exports

// exports.id = 1 // ok
// exports = { id: 1 } // not ok (assigning to a new object)
// module.exports = { id: 1 } // we need to use this sintax to export an object

/* -------------------------------------------------------------------------- */
/*               Why variables and functions are locally scoped?              */
/* -------------------------------------------------------------------------- */

// require('module').wrapper
// Proxy [
//   [
//     '(function (exports, require, module, __filename, __dirname) { ',
//     '\n});'
//   ],
//   { set: [Function: set], defineProperty: [Function: defineProperty] }
// ]

// Since we are in a function we can log the function arguments (console.log(arguments))
// to see the arguments detailed above

// The wrapping functions returned value is the exports argument
// As we have the exports an the module objects, exports is just a reference to module.exports
// we can change properties of the exports Object, but not its reference
// Require takes a module path and returns its exports properties

/* -------------------------------------------------------------------------- */
/*                           Example Mocked Require                           */
/* -------------------------------------------------------------------------- */
// require = function () {
//   return { mocked: true }
// }

// const fs = require('fs')
// console.log(fs) // { mocked: true }

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                           Require Object Example                           */
/* -------------------------------------------------------------------------- */
const print = (stars, header) => {
  console.log('*'.repeat(stars))
  console.log(header)
  console.log('*'.repeat(stars))
}

if (require.main == module) {
  // Running as a script
  print(process.argv[2], process.argv[3])
} else {
  // Being required
  module.exports = print
}

/* -------------------------------------------------------------------------- */
/*                                   Caching                                  */
/* -------------------------------------------------------------------------- */
// require.cache // prevents the module to be called twice

// delete require.cache['full/path/to/file'] // not the most efficient way

// The best way is to wrap the exported in a function and export that function

module.exports = () => {
  console.log(` _    ,                                                  
  ' )  /                      /           /               /
   /--/ __.  _   _   __  ,   /_  __.  _. /_  o ____  _,  / 
  /  (_(_/|_/_)_/_)_/ (_/_  / /_(_/|_(__/ <_<_/ / <_(_)_'  
           /   /       /                             /|o   
          '   '       '                             |/     `)
}

// Then we require the file
require('./asci-art')() // then the function will be called each time it's required
