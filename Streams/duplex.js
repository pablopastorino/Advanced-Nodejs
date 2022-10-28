const { Duplex } = require('stream')

const inOutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  },

  read(size) {
    if (this.currentChartCode > 90) {
      this.push(null)
      return
    }
    this.push(String.fromCharCode(this.currentChartCode++))
  }
})

inOutStream.currentChartCode = 65

process.stdin.pipe(inOutStream).pipe(process.stdout)
