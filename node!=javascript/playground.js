const print = (stars, header) => {
  console.log('*'.repeat(stars))
  console.log(header)
  console.log('*'.repeat(stars))
  console.log('Formas de verificar como se corre un módulo')
  console.log('Is being runned as standalone module(script): ', require.main == module) // main es el modulo que se esta ejecutando?
  console.log(
    'The executed module has children? require.main.children.length ',
    require.main.children.length
  ) // si se ejecuta como script, module no tendrá hijos. En cambio si se requiere, module tendrá al menos un hijo
  console.log(
    'Checking the require.main.filename === __filename',
    require.main.filename == __filename
  )
}

if (require.main == module) {
  // Running as a script
  print(process.argv[2], process.argv[3])
} else {
  // Being required
  module.exports = print
}

console.log('require.cache', require.cache)

require.cache = []

console.log('require.cache', require.cache)
