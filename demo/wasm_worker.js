
fetch("/quicksort.wasm")
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes, {}))
    .then(wasmModule => {       
        onmessage = (evt) => {
            const data = evt.data
            console.log(`wasm_worker: Received message to sort array of length ${data.length}`)
            const start = new Date()
            wasmModule.instance.exports.quicksort(data)
            const end = new Date()
            
            console.log(`wasm_worker: sorting finished; sending back result`);
            postMessage({
                start: start,
                end: end,
            })
          }
});


