const longComputation = () => {
  let sum = 0
  for (let i = 0; i < 7.866e10; i++) {
    sum += 1
  }
  return sum
}

process.on('start', msg => {
  process.send('Starting')
  const sum = longComputation()
  process.send(sum)
})
