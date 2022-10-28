const fs = require('fs')

const data = fs.readFileSync(__dirname + '/data.html', 'utf-8')

const search = /href=".*"/gim

const matches = data.matchAll(search)

const matchesArr = Array.from(matches)

matchesArr.forEach(e => console.log(e[0]))
