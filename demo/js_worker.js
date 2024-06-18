function fib(n) {
    if (n < 2) {
        return n
    }

    let a = 0
    let b = 1

    for (let i = 2; i <= n; i++) {
        const tmp = a + b
        a = b
        b = tmp
    }

    return b
}

onmessage = (evt) => {
    const number = evt.data
    console.log(`js_worker: Received message to calculate fib(${number})`)
    const start = new Date()
    const result = fib(number)
    const end = new Date()
    
    console.log(`js_worker: fib(${number}) finished; sending back result`);
    postMessage({
        start: start,
        end: end,
        number: result,
    })
  }