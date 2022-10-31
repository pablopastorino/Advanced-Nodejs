const fs = require('fs')
const path = require('path')
const os = require('os')
const dirname = path.join(__dirname)

// Asynchronous
fs.readFile(__filename, (err, data) => {
  if (err) throw err

  console.log(data.toString()) // data is a Buffer unless character encoding is specified (second parameter)
})

// Synchronous
const data = fs.readFileSync(__filename)
// exceptions are immediately thrown (can't handle it with callbacks)
// do something with the data

/* ------------------------- Exercise: Truncate File ------------------------ */
// const files = fs.readdirSync(dirname)

// files.forEach(file => {
//   const filePath = path.join(dirname, file)

//   fs.stat(filePath, (err, stats) => {
//     // stat gives meta information about the file
//     if (err) throw err

//     if (file === 'testFile.txt') {
//       fs.truncate(filePath, Math.ceil(stats.size / 2), err => {
//         if (err) throw err
//       })
//     }
//   })
// })

/* --------------- Exercise: Delete Anything Older Than 7 days -------------- */
const filesDir = path.join(__dirname, 'files')
const files = fs.readdirSync(filesDir)
const ms1Day = 24 * 60 * 60 * 1000

// Create Folder and Files
// fs.mkdirSync(newDirname)

// for (let i = 0; i < 10; i++) {
//   const filePath = path.join(newDirname, `files${i}`)

//   fs.writeFile(filePath, i.toString(), err => {
//     if (err) throw err

//     const time = (Date.now() - i * ms1Day) / 1000

//     fs.utimes(filePath, time, time, err => {
//       if (err) throw err
//     })
//   })
// }

// Delete Files Older Than 7 Days
files.forEach(file => {
  const filePath = path.join(filesDir, file)

  fs.stat(filePath, (err, stats) => {
    console.log(stats)

    if (err) throw err

    if (Date.now() - stats.mtime.getTime() > 7 * ms1Day) {
      fs.unlink(filePath, err => {
        if (err) throw err
        console.log(`deleted ${filePath}`)
      })
    }
  })
})

/* -------------------------- Exercise Watch Files -------------------------- */

const logWithTime = message => console.log(`${new Date().toUTCString()}: ${message}`)

fs.watch(filesDir, (eventType, filename) => {
  if (eventType === 'rename') {
    // add or delete
    const index = files.indexOf(filename)

    if (index >= 0) {
      files.splice(index, 1)
      logWithTime(`${eventType}: deleted - ${filename}`)
    } else {
      files.push(filename)
      logWithTime(`${eventType}: added - ${filename}`)
    }
  }
})
