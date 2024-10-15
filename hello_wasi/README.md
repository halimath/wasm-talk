# hello_wasi

`hello, world` using WASM and WASI with handwritten _WebAssembly Text_ (`wat`).

# Prerequisites

For running you need it WASM runtime environment with support for 
_wasi_snapshot_preview1_, i.e. `wasmtime` or `wasmer`.

For building, you need `wat2wasm` which is part of [binaryen].

[binaryen]: https://github.com/WebAssembly/binaryen

# Building

```shell
make hello.wasm
```

# Running

```shell
wasmtime hello.wasm
```

