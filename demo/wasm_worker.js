
console.log("Loading fib.wasm")
fetch("/fib.wasm")
    .then(response => { console.log(response); return response.arrayBuffer() })
    .then(bytes => WebAssembly.instantiate(bytes, {}))
    .then(wasmFib => {
        console.log(wasmFib)

        onmessage = (evt) => {
            const number = evt.data
            console.log(`wasm_worker: Received message to calculate fib(${number})`)
            const start = new Date()
            const result = wasmFib.instance.exports.fib(number)
            const end = new Date()
        
            console.log(`wasm_worker: fib(${number}) finished; sending back result`);
            postMessage({
                start: start,
                end: end,
                number: result,
            })
        }
    });


