// require('something') process
// 1. Resolving (to find the ABSOLUTE PATH OF A MODULE)
// 2. Loading: depending of the CONTENT of the file at the resolved path
// 3. Wrapping: what gives every module its PRIVATE SCOPE and make require local to every module
// 4. Evaluating: is what the VM eventualy does with the code
// 5. Caching: so when require this module again we don't go over all this steps again

console.log(module)
// Modules have a 1 to 1 relation with the FileSystem
// we REQUIRE a module by LOADING THE CONTENT OF A FILE INTO MEMORY
// But first we need to find the location of a file

// If we only want to resolve a module (but not load it)
module.resolve('module') // throws an error if the file doesn't exists
// Modules can be folders to (with an index.js by default. Can be changed in package.json with "main": "start.js")

// We can place the module anywhere we want an rquired with an absolute or relative path

// If two modules require each other is called Circular Modular dependency
// Wich is allowed in node
