// node debug debug.js
// to activate the debuger on the command line

function negativeSum(...args) {
  return args.reduce((arg, total) => total - arg, 0)
}

console.log(negativeSum(1, 5, 10))
