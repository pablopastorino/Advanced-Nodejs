const fs = require('fs')
const https = require('https')
const path = require('path')

const writable = fs.createWriteStream(path.join(__dirname, 'gotHtml.html'))

const req = https.get('https://makingsense.com/index.html', res => {
  res.setEncoding('utf-8')

  res.on('data', chunk => writable.write(chunk))
  res.on('end', () => console.log('Ended writing file'))
})
