/* -------------------------------------------------------------------------- */
/*                            Scalling Applications                           */
/* -------------------------------------------------------------------------- */

// Using multiple processes is the only way to scale a Nodejs application
// Nodejs is designed to built distribuited applciations with many nodes (that's why its name)
// Reasons to scale
// 1. Workload
// 2. Availability
// 3. Fault tolerance

/* ------------------------- Scalability Strategies ------------------------- */
// 1. Cloning
// 2. Decomposing (microservices)
// 3. Splitting (each portion is responsible for a part of the application data. Also named horizontal partitioning or sharding)

/* -------------------------------------------------------------------------- */
/*                    Child Process Events and Standard IO                    */
/* -------------------------------------------------------------------------- */
// Processses communicate each other with the messages system
// The child process module uses the operating system functionalities by running any system commands inside the child process.
// Control its input stream (eg: pass arguments) and listen in its output stream (eg: pipe its output)

// Ways to create a child process in Node

const { spawn, exec, execFile, fork } = require('child_process')
/* -------------------------------------------------------------------------- */
/*                                   spawn()                                  */
/* -------------------------------------------------------------------------- */

/*

// Launches a command in a new procss and we can use it to pass arguments

// const child = spawn('pwd')
const find = spawn('find', ['.', '-type', 'f'])

// returns a child process instance (wich implements node events api this means that we can register handlers for this child object directly)
const wc = spawn('wc', ['-l'])

find.stdout.pipe(wc.stdin)

wc.stdout.on('data', data => {
  console.log(`Number of files: ${data}.`)
})

wc.stderr.on('data', data => {
  console.log(`Child stderr:\n${data}.`)
})

wc.on('exit', function (code, signal) {
  console.log(`Child process exited with the code ${code}. Signal ${signal}.`)
})

*/

// Other events we can listen on this child process:
// disconnect: when the parent process manualy calls the child process disconect() method
// error: when a process can not be spawn or killed
// message: when the child process triggers the process.send'message') or send 'messages'
// close: standar IO stream for child process to get close

// Every child process get three standar IO streams (child.stdin, child.stdout, child.stderr)
// The child process gettin exited doesn't mean the the stream got closed

/* -------------------------------------------------------------------------- */
/*                            exec() and execFile()                           */
/* -------------------------------------------------------------------------- */
// The spawn method does not create a shell and is more efficient than exec() method that does it
// Other difference is that exec() buffers the whole ouput generates by the command and passes to a callback
// The spawn method is better when the data returned from the command is big. Because that data will be stramed
// with the standard data IO object. And make the child process inhert the standard IO object of its parents if we want to.

/*
exec('find . -type f | wc -l', (err, stdout, stderr) => {
  // has the shell syntax and receives a callback
  if (err) {
    console.error(`exec error ${err}`)
    return
  }
  console.log(`Number of files: ${stdout}`)
})

*/

// We can achieve this with (this is the best of the two worlds: because has the shell syntax and streams the output)

const child = spawn('pwd && find . -type f | wc -l && echo $ANSWER', {
  stdio: 'inherit', // inherits from the parent process
  shell: true,
  cwd: '/home/pablo', // to execute in anoter directory,
  env: { ANSWER: 15 }, // to define an environment variable. Empty object '{}' if we dont want the child to inherits from its parent
  detached: true // to make the procceses independent (eg the parent can exit but thte child still running). To do this also the stdio: 'ignore' option must be passed
})

/* -------------------------------------------------------------------------- */
/*                                   fork()                                   */
/* -------------------------------------------------------------------------- */
// Is a variation of the spawn() function. With the main difference is that the communication channel is stablished to the child process when using fork.
// To exchange messages with an interface similar to the event emitter module.
//  See example1 and example2

/* -------------------------------------------------------------------------- */
/*                             The Cluster Module                             */
/* -------------------------------------------------------------------------- */
// Can be used to enable load balancing under an environment of multiple CPU cores
// Its based on the fork() function. Basically alows us to fork our main application process as many times as we have cpu cores.
// Then it will take over and load balance all requests to the main process across all forked processes.
// Is Nodes way to help us to implement the Cloning Scalability Strategy but ONLY ON ONE MACHINE

// How It Works
// We create a Master Process an that master process:
// Forks a number of Worker Proccesses and manages them.
// Each worker process represents an instance of the application we want to scale
// Incomming requests are handled by the master process and it decides wich worker process should handle the request (using a round-robin algorithm to pick up a worker process)

// Example3: Load-balancing an HTTP server

// To benchmark the server (install apache first)
// ab -c200 -t10 http://localhost:8080/
// this will test the server with 200 connections for 10 seconds

// Once we have a reference mark, we can scale our application with a cloning strategy using the cluster module

/* -------------------------------------------------------------------------- */
/*                    Broadcasting Messages to All Workers                    */
/* -------------------------------------------------------------------------- */
// Under the hood cluster module uses the child process fork

// Example 4

/* -------------------------------------------------------------------------- */
/*                   Availability and Zero-downtime Restarts                  */
/* -------------------------------------------------------------------------- */
// When running a single instance we have the problem that when it crashes will be some downtime until it restarts.
// Even if the process was automated as it should be
// Also applies to the case when the code has to be redeply to upload new code (there will be a downtime that will affect the availability of the system)

// Example 5: Simulate a Random Crash

// ab -c200 -t10 http://localhost:8080/
// Also to measure the availability (Checking the failed requests)

// PM2 (process monitor 2) make all those tasks extremily easy

// Example 6: When we want to restart all workers (for example when we deploy new code)

// kill -SIGUSR2 [MASTERPID]

/* -------------------------------------------------------------------------- */
/*                   Sharing State ans Sticky Load Balancing                  */
/* -------------------------------------------------------------------------- */
