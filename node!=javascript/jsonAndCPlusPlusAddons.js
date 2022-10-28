// require('something') process:
// 1. try something.js
// 2. try something.json (and parse it as a JSON text file)
// 3. try something.node (binary file, and treat it as a compiled addon module)
// To make this work, we need to compile the .cc first
// 1. Create a "addon-src" directory
// 2. Place hello.cc in there
// 3. At the same level? place a binding.gyp file. With the targets (target_name) and sources (hello.cc and others...)
// 4. Install (npm i -g node-gyp) package
// 5. Inside the addon-src/ run node-gyp configure and then node-gyp build

// To see the support of required extensions

// require.extensions
// [Object: null prototype] {
//   '.js': [Function (anonymous)],
//   '.json': [Function (anonymous)],
//   '.node': [Function (anonymous)]
// }

/* -------------------------------------------------------------------------- */
/*                            To see the functions                            */
/* -------------------------------------------------------------------------- */
// require.extensions['.js'].toString()
// require.extensions['.json'].toString()
// require.extensions['.node'].toString()
