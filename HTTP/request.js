const http = require('http')
const fs = require('fs')
const path = require('path')

/* ------------------------------ First Example ----------------------------- */

// const req = http.request({ hostname: 'www.google.com' }, console.log) // logs the response (http incomming message)
// // the request objet is a writable stream

// req.on('error', console.error) // logs the error

// req.end()

/* ----------------------------- Second Example ----------------------------- */
// req: http.ClientRequest
const req = http.get('http://www.google.com', res => {
  // res: http.IncomingMessage
  console.log(Object.keys(res))
  console.log(res.statusCode)
  console.log(res.headers)

  res.setEncoding('utf-8')
  let rawData = ''
  res.on('data', chunk => (rawData += chunk))
  res.on('end', () => {
    try {
      // const parsedData = JSON.parse(rawData)
      // console.log(rawData)
      getUrls(rawData)
    } catch (error) {
      console.log(error)
    }
  })
})

console.log(req.agent) // http.Agent
req.on('error', console.error)

// The same interface is for working with https (only replace http for https)

function getUrls(data) {
  const urls = /href=".*"/gim

  const result = data.matchAll(urls)

  Array.from(result).forEach(e => console.log(e[0]))

  // const filePath = path.join(__dirname, `data.html`)

  // fs.writeFile(filePath, resultArray.join('\n'), err => {
  //   if (err) throw err
  //   console.log('Success!!!')
  // })
}
