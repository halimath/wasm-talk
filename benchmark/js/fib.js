
function fib (x) {
    if (x === 0)
        return 0
    
    
    if (x < 3)
        return 1
    

    return fib(x-1) + fib(x-2)
}

if (process.argv.length < 3) {
    console.error(`${process.argv.slice(0, 2).join(' ')}: Missing argument\n`)
    process.exit(1)
}

let x = parseInt(process.argv[2])
console.log(`fib(${x}) = ${fib(x)}`)