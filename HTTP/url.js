const url = require('url')
const querystring = require('querystring')

const href =
  'https://www.google.com/search?q=u001B+clear+terminal&oq=u001B+clear+terminal&aqs=chrome..69i57j33i160l3.8044j1j7&sourceid=chrome&ie=UTF-8]'

/* ----------------------------------- url ---------------------------------- */
const parsed = url.parse(href, true)
console.log(parsed)

// The inverse method is url.format to format a url from an object

/* ------------------------------- querystring ------------------------------ */
const queryObject = querystring.parse(parsed.search)
console.log(queryObject)

const queryString = querystring.stringify(parsed.query)
console.log(queryString)

/* -------------------------------------------------------------------------- */
/*                                 New Methods                                */
/* -------------------------------------------------------------------------- */
const getProperties = object => {
  console.log(`/* ------------------------------- Properties ------------------------------- */`)
  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(object))
  props.forEach(p => console.log(p, object[p]))
}

const googleUrl = new URL(
  '/search?q=u001B+clear+terminal&oq=u001B+clear+terminal&aqs=chrome..69i57j33i160l3.8044j1j7&sourceid=chrome&ie=UTF-8]',
  'https://www.google.com'
)

const alkemyUrl = new URL('https://academy.alkemy.org/home')

const gmailUrl = new URL(
  'https://accounts.google.com/AccountChooser/signinchooser?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser'
)

console.log('='.repeat(50))
console.log('\t\tNew Methods: URL Class')
console.log('='.repeat(50))
getProperties(googleUrl)
getProperties(alkemyUrl)
getProperties(gmailUrl)
