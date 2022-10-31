// We can install packages from github repos
// npm i expressjs/express // install the latest package on the master branch
// npm i expressjs/express#4.14.0 // installs a specific package

/* ------------------- Only report what would be installed ------------------ */
// npm i --dry-run

// npm ll -g --depth=0 // all packages (only the first level)
// npm ll -g --depth=0  --json to convert in json

/* -------------------------- Minimun Package Json -------------------------- */
// {
//   "name": "hello-npm",
//   "version": "1.0.0"
// }

/* ------------------------- NPM Packages Categories ------------------------ */
// npm i --save or -S // PRODUCTION DEPENDENCY

// npm i --save-dev or -D // DEVELOPMENT DEPENDENCY

// npm i --save-optional or -O // OPTIONAL DEPENDENCY (checks for the dependency and only uses if exists)

/* ---------------------------- Update Package/s ---------------------------- */

// npm update or npm update package (updates according to the version range)

// = // default
// * or x // any number
// ^ // MINOR: any number bigger than the specified minor version
// ~ // PATCH: any number bigger than the specified patch

// To update npm
// npm i npm -g

// To watch the updated packages
// npm outdated -g (to the the globals)

/* ------------------------------ Configuration ----------------------------- */

// npm config list -l | grep init

// To install always with the save flag
// npm config set save true

/* ----------------------------- Search Packages ---------------------------- */
// npm search

/* ------------------------------ Lock Packages ----------------------------- */
// npm shrinkwrap (locks de dependency versions)

/* --------------------- Open the homepage of a package --------------------- */
// npm home lodash (opens homepage of a package)

// npm repo lodash (opens the repository page of a package)

/* ----------------------------- Delete Packages ---------------------------- */
// That are not in package.json
// npm prune
