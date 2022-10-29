const longComputation = () => {
  let sum = 0
  const BIG_NUMBER = 7.866e8
  const TEN_PERCENT = BIG_NUMBER / 10

  for (let i = 0; i < BIG_NUMBER; i++) {
    sum += 1

    if (sum % TEN_PERCENT === 0) process.send('progress')

    if (sum === BIG_NUMBER) process.send('done')
  }

  return sum
}

process.on('message', msg => {
  process.send(`Received order: ${msg}`)

  const sum = longComputation()

  process.send(`Result: ${sum}`)
})
