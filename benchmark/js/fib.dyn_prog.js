
function fib (x) {
    if (x < 2) return x    
    let a = 0, b = 1
    for (let i = 2; i <= x; i++) {
        const tmp = a + b
        a = b
        b = tmp
    }
    return b
}

if (process.argv.length < 3) {
    console.error(`${process.argv.slice(0, 2).join(' ')}: Missing argument\n`)
    process.exit(1)
}

let x = parseInt(process.argv[2])
console.log(`fib(${x}) = ${fib(x)}`)