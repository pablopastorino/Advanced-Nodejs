const crypto = require('crypto')
const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2]

const { Transform } = require('stream')

/* -------------------------------- Example 1 ------------------------------- */
// const upperCaseTr = new Transform({
// 	transform(chunk, encoding, callback) {
// 		this.push(chunk.toString().toUpperCase())
// 		callback()
// 	}
// })

// process.stdout.pipe(upperCaseTr).pipe(process.stdout)

/* -------------------------------- Example 2 ------------------------------- */
// fs.createReadStream(file)
// 	.pipe(zlib.createGzip())
// 	.on('data', () => process.stdout.write('. '))
// 	.pipe(fs.createWriteStream(file + '.gz'))
// 	.on('finish', () => {
// 		console.log('Done!')
// 	})

/* -------------------------------- Example 3 ------------------------------- */
const progress = new Transform({
	transform(chunk, encoding, callback) {
		process.stdout.write('. ')
		callback(null, chunk)
	}
})

const iv = Buffer.alloc(16, 0)

fs.createReadStream(file)
	.pipe(zlib.createGzip())
	.pipe(crypto.createDecipheriv('aes-256-cbc', 'a_secret', iv))
	.pipe(progress)
	.pipe(fs.createWriteStream(file + '.zz'))
	.on('finish', () => {
		console.log('Done!')
	})

// To decode it (in an unzip.js file)
fs.createReadStream(file)
	.pipe(crypto.createDecipheriv('aes-256-cbc', 'a_secret', iv))
	.pipe(zlib.createGunzip())
	.pipe(progress)
	.pipe(fs.createWriteStream(file.slice(0, -3)))
	.on('finish', () => {
		console.log('Done!')
	})
