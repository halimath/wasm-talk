# demo

A small demonstration web app showing how to use WASM in web context and how
the performance compares to JavaScript.

This demo implements the [QuickSort] algorithm both in JavaScript and C
and compiles the C version to WASM. Both implementations are then run
concurrently (via [WebWorker]s) on a large array filled with random numbers.

[QuickSort]: https://en.wikipedia.org/wiki/Quicksort
[WebWorker]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

# Prerequisites

* Node >= v22
* NPM >= 10.8.1
* Emscripten >= v3.1

# Building

To build the WASM, run the following in directory `wasm`:

```shell
make
```

To build the webapp run the following in project root:

```shell
npm run build
```

# Running

In _dev mode_:

```shell
npm run dev
```

