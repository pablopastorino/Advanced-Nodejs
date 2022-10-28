// Features:
// Shipping
// Staged (--harmony flag to enable)
// In Progress

// node --v8-options | less

// node -v8-options | grep gc
// shows garbage collector options

// v8 options can be settled at runtime (with the v8 module)

// libuv: library that node uses to manage async operations
// it has a thread pool to handle the synchronous os operations (that can't be handled asynchronous)
// also provides node with the event loop

/* ------------------------- Other Node Dependencies ------------------------ */
// http-parser: C library for parse http messages (requests and responses)

// c-ares: enables to perform asynchronos SSL queries

// OpenSSL: provides implementation for cryptographic functions

// zlib: fast async streamming compresion and decompresion interfaces
