const { Readable } = require('stream')

/* -------------------------------- Example 1 ------------------------------- */

// const inStream = new Readable()

// inStream.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
// inStream.push(null)

// // To consume the stream (all at once)
// inStream.pipe(process.stdout)

/* -------------------------------- Example 2 ------------------------------- */

// To read by size
const inBySize = new Readable({
	read(size) {
		setTimeout(() => {
			if (this.currentCharCode > 90) {
				this.push(null)
				return
			}
			this.push(String.fromCharCode(this.currentCharCode++))
			this.push(String.fromCharCode(12))
		}, 150)
	}
})

inBySize.currentCharCode = 65

inBySize.pipe(process.stdout)

process.on('exit', () => {
	console.error(`\n\ncurrentCharCode is ${inBySize.currentCharCode}`)
})

// node Readable.js | head -c3
process.stdout.on('error', process.exit)
