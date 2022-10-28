/* -------------------------------------------------------------------------- */
/*                               I/O Operations                               */
/* -------------------------------------------------------------------------- */
// Usually refers to disk and network acccess (because are the slowers)
// But tecnically everything is an I/O operation to the processor

/* -------------------------------------------------------------------------- */
/*                                 Event Loop                                 */
/* -------------------------------------------------------------------------- */
// The entity that HANDLES EXTERNAL events and converts them into CALLBACK INVOCATIONS
// or
// A loop that picks events from the event queue and pushes their callbacks to the call stack
// Is what makes the asynchronous program style possible

// V8: the runtime engine has
// Heap: the memory that is allocated by the virtual machine for various taks (the objects)
// Stack: is simply a LIST OF FUNCTIONS (stack data structure: first in last out)
//        Every time we step into a function it gets pulled into the stack and when we return it gets pushed out

// Event Loop: (libuv libray) simple loop that works between the queue and the call stack

// Queue: (libuv library) first in first out structure.

// Node API (setTimeout() fs.readFile(), emitter.on()...)
